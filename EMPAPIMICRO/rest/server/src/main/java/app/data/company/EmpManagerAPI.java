package app.data.company;

import java.util.ArrayList;
import java.util.logging.Logger;
import app.services.EmpManagerProxy;
import io.grpc.StatusRuntimeException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import emp.EmpContract.EmpDetail;
import emp.EmpContract.EmpOne;
import com.google.protobuf.Empty;

@Path("/api/emp")
public class EmpManagerAPI {

    @GET
    @Path("allemp")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmp() {

        var resources = new ArrayList<EmployeeEntry>();

        try (var remote = new EmpManagerProxy()) {
            var reply = remote.fetchEmployee(Empty.getDefaultInstance());

            try {
                reply.forEachRemaining(msg -> {
                    var e = new EmployeeEntry();
                    e.setEId(msg.getEmpId());
                    e.setEmpName(msg.getEmpName());
                    e.setAge(msg.getAge());
                    e.setSalary(msg.getSalary());
                    resources.add(e);
                });
            } catch (Exception ex) {
                return Response.status(500).build();
            }

            return Response.ok(resources).build();   // ALWAYS 200
        }
    }


    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEmp(EmployeeEntry entry) {
        try (var remote = new EmpManagerProxy()) {
            var request = EmpDetail.newBuilder()
                .setEmpId(entry.getEId())
                .setEmpName(entry.getEmpName())
                .setAge(entry.getAge())
                .setSalary(entry.getSalary())
                .build();
            var reply = remote.addEmployee(request);
            return Response.ok(reply).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOneEmp(@PathParam("id") int id) {
        try (var remote = new EmpManagerProxy()) {
            var request = EmpOne.newBuilder()
                .setEmpId(id)
                .build();
            var reply = remote.getOneEmp(request);
            if (reply.getEmpId() == 0)
                return Response.status(404).build();

            var resource = new EmployeeEntry();
            resource.setEId(reply.getEmpId());
            resource.setEmpName(reply.getEmpName());
            resource.setAge(reply.getAge());
            resource.setSalary(reply.getSalary());
            return Response.ok(resource).build();
        }
    }
}