package app.services.company;

import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import app.data.company.EmployeeEntity;
import emp.empManagerGrpc.empManagerImplBase;
import emp.EmpContract.AllEmployee;
import emp.EmpContract.EmpDetail;
import emp.EmpContract.EmpOne;
import emp.EmpContract.EmpStatus;
import emp.EmpContract.SingleEmployee;


import com.google.protobuf.Empty;
import io.grpc.stub.StreamObserver;


public class EmpManagerService extends empManagerImplBase {

    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("app.data");

    //rpc FetchEmployee(google.protobuf.Empty) returns(stream AllEmployee);
    @Override
    public void fetchEmployee(Empty request , StreamObserver<AllEmployee> responseObserver) {
        try(var em = emf.createEntityManager()) {
            em.createQuery("Select e from EmployeeEntity e", EmployeeEntity.class)
                .getResultList()
                .forEach(entity -> {
                    AllEmployee message = AllEmployee.newBuilder()
                        .setEmpId(entity.getEId())
                        .setEmpName(entity.getEmpName())
                        .setAge(entity.getAge())
                        .setSalary(entity.getSalary())
                        .build();
                    responseObserver.onNext(message);
                });
                responseObserver.onCompleted();
        }catch (Exception ex) {
            ex.printStackTrace();
            responseObserver.onError(
                Status.INTERNAL.asRuntimeException()
        );
    }
    }

    //rpc AddEmployee(EmpDetail) returns(EmpStatus);
    @Override
    public void addEmployee(EmpDetail request , StreamObserver<EmpStatus> responseObserver) {
        try(var em = emf.createEntityManager()){
            var tran = em.getTransaction();
            tran.begin();
            var entity = new EmployeeEntity();
            entity.setEId(request.getEmpId());
            entity.setEmpName(request.getEmpName());
            entity.setAge(request.getAge());
            entity.setSalary(request.getSalary());
            em.persist(entity);
            tran.commit();

            var reply = EmpStatus.newBuilder()
                            .setConfirmationMsg("Employee Added Successfully!")
                            .build();
            responseObserver.onNext(reply);
            responseObserver.onCompleted();

        }catch(Exception ex){
            ex.printStackTrace();
            responseObserver.onError(ex);
        }
    }

    //rpc GetOneEmp(EmpOne) returns(SingleEmployee);
    public void getOneEmp(EmpOne request , StreamObserver<SingleEmployee> responseObserver){
        try(var em = emf.createEntityManager()){
            EmployeeEntity entity = em.createQuery("Select e from EmployeeEntity e where e.eId = ?1", EmployeeEntity.class)
                .setParameter(1 , request.getEmpId())
                .getSingleResult();

            SingleEmployee reply = SingleEmployee.newBuilder()
                .setEmpId(entity.getEId())
                .setEmpName(entity.getEmpName())
                .setAge(entity.getAge())
                .setSalary(entity.getSalary())
                .build();         
            responseObserver.onNext(reply);
            responseObserver.onCompleted();
        }catch(Exception ex){
            ex.printStackTrace();
            responseObserver.onError(ex);
        }
    }
    
}
