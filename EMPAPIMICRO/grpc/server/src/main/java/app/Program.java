package app;
import io.grpc.ServerBuilder;
import app.services.company.EmpManagerService;
public class Program {
    
    public static void main(String[] args) throws Exception {
        System.out.println("Server starting on port 4030");
        ServerBuilder.forPort(4030)
            .addService(new EmpManagerService())
            .build()
            .start()
            .awaitTermination();
    }
}
