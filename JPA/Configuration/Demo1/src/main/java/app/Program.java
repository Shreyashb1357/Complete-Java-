package app;
import app.Tourism.Data.*;
import app.Tourism.Models.*;

// public class Program {
    
//     public static void main(String[] args) throws Exception {
//         var site = new SiteModel();
//         if(args.length > 0){
//             site.handleVisit(args[0], 5);
//             System.out.printf("Welcome %s%n", args[0]);
//         }else{
//             for(var entry : site.getVisitors()){
//                 System.out.printf("%-16s%8d\t%s%n", entry.name(), entry.visits(), entry.recent());
//             }
//         }
//     }
// }

public class Program {
    public static void main(String[] args) throws Exception {
        var site = new SiteModel();
        if(args.length > 0) {
            site.handleVisit(args[0],5);
            System.out.printf("Welcome %s%n",args[0]);
        }else{
            for(var entry : site.getVisitor()){
                System.out.printf("%-16s%8d\t%s%n",entry.name(), entry.visits(), entry.recent());
            }
        }
    }
}