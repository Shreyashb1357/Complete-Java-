package app;
import app.Models.*;
import java.io.IOException;
import java.net.Socket;

public class Program {
    public static void main(String[] args) throws IOException {
        String item = args[0];
        int qty = Integer.parseInt(args[1]);
        var a = new ShopModel(args[2]);
        var b = a.fetchItem(item);
        if(qty <= b.stock())
            System.out.printf("The total price : %.2f%n", 1.08 * qty * b.cost());
        else
            System.out.println("Not in Stock");
           
        
    }
}








//    Using ofVirtual thread
//----------------------------------------------------------------------------//
// public class Program {
//     public static void main(String[] args) throws IOException, InterruptedException {
//         String item = args[0];
//         int qty = Integer.parseInt(args[1]);
//         var a = new ShopModel(args[2]);
        
//         Thread t = Thread.ofVirtual().start(()-> {
//             try{
//                 var b = a.fetchItem(item);
//                 if(qty <= b.stock())
//                     System.out.printf("The total price : %.2f%n", 1.08 * qty * b.cost());
//                 else
//                     System.out.println("Not in Stock");
//             }
//             catch(IOException e) {}
//         });
//         t.join();
//     }
// }





//    Using ofPaltform thread. i.e. using multiple threads.
//----------------------------------------------------------------------------//
// public class Program {
//     public static void main(String[] args) throws IOException {
//         String item = args[0];
//         int qty = Integer.parseInt(args[1]);
//         var a = new ShopModel(args[2]);
        
//         Thread.ofPlatform().start(()-> {
//             try{
//                 var b = a.fetchItem(item);
//                 if(qty <= b.stock())
//                     System.out.printf("The total price : %.2f%n", 1.08 * qty * b.cost());
//                 else
//                     System.out.println("Not in Stock");
//             }
//             catch(IOException e) {}
//         });
//     }
// }