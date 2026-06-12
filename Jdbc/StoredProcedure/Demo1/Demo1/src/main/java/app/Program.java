package app;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Types;

// public class Program {
    
//         public static void main(String[] args) throws Exception {
//         String customerId = args[0].toUpperCase();
//         int productNo = Integer.parseInt(args[1]);
//         int quantity = Integer.parseInt(args[2]);
//         var con = DriverManager.getConnection("jdbc:oracle:thin:@//metiitdac.met.edu/xepdb1", "dac4", "metiit");
//         var cstmt = con.prepareCall("{call place_order(?, ?, ?, ?)}");
//         cstmt.setString(1, customerId);
//         cstmt.setInt(2, productNo);
//         cstmt.setInt(3, quantity);
//         cstmt.registerOutParameter(4, Types.INTEGER);
//         try{
//             cstmt.execute();
//             System.out.printf("New Order Number: %d%n", cstmt.getInt(4));
//         }catch(SQLException e){
//             System.out.printf("Order Failed: %s%n", e.getMessage());
//         }
//         cstmt.close();
//         con.close();
//     }
// }

public class Program {
    public static void main(String[] args) throws Exception {
        String custId = args[0].toUpperCase();
        int productNo = Integer.parseInt(args[1]);
        int qty = Integer.parseInt(args[2]);
        //var con = DriverManager.getConnection("jdbc:oracle:thin:@//metiitdac.met.edu/xepdb1","dac4", "metiit");
        var con = DriverManager.getConnection("jdbc:oracle:thin:@//metiitdac.met.edu/xepdb1","dac4", "metiit");
        var cstmt = con.prepareCall("{call place_order(?,?,?,?)}");
        cstmt.setString(1,custId);
        cstmt.setInt(2,productNo);
        cstmt.setInt(3, qty);
        cstmt.registerOutParameter(4, Types.INTEGER);
        try{
            cstmt.execute();
            System.out.printf("New Order no : %d%n", cstmt.getInt(4));
        }catch(SQLException e){
            System.out.printf("Order failed: %s%n", e.getMessage());
        }
        cstmt.close();
        con.close();
    }
}