import Bankfin.*;
import java.lang.reflect.Method;

public class Program
{
    public static void main(String[] args) throws Exception
    {
        double p = Double.parseDouble(args[0]);
        Class<?> c = Class.forName("Bankfin."+ args[1]);
        Object policy = c.getConstructor().newInstance();
        Method scheme = c.getMethod(args[2], double.class, int.class);
       MethodHandle schemeHandle = MethodHandles.lookup();
            .unreflect(scheme)
            .bindTo(policy);
            
        for (int n = 1; n<=m; ++n) {
            float r = (float)scheme.invoke(policy , p , n);
            double emi = Loan.monthlyInstallment(p , n , r);
            System.out.printf("%-6d%16.2f%n",n , emi);
        } 
    }
}