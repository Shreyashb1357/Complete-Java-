package app.services;

import java.util.Iterator;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import emp.empManagerGrpc.empManagerImplBase;
import emp.EmpContract.AllEmployee;
import emp.empManagerGrpc;
import emp.EmpContract.EmpDetail;
import emp.EmpContract.EmpOne;
import emp.EmpContract.EmpStatus;
import emp.EmpContract.SingleEmployee;
import com.google.protobuf.Empty;


public class EmpManagerProxy implements AutoCloseable {
    private final ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost" , 4030)
        .usePlaintext()
        .build();

    public EmpStatus addEmployee(EmpDetail request){
        return empManagerGrpc.newBlockingStub(channel)
            .addEmployee(request);
    }

    public Iterator<AllEmployee> fetchEmployee(Empty request){
        return empManagerGrpc.newBlockingStub(channel)
            .fetchEmployee(request);
    }

    public SingleEmployee getOneEmp(EmpOne request){
        return empManagerGrpc.newBlockingStub(channel)
            .getOneEmp(request);
    }

    public void close(){
        channel.shutdown();
    }
}

    // rpc AddEmployee(EmpDetail) returns(EmpStatus);
    // rpc FetchEmployee(google.protobuf.Empty) returns(stream AllEmployee);
    // rpc GetOneEmp(EmpOne) returns(SingleEmployee);