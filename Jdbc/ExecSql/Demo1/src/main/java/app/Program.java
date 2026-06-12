package app;

import java.sql.DriverManager;

public class Program {
    
    public static void main(String[] args) throws Exception {
        var con = DriverManager.getConnection("jdbc:sqlite:shop.db");
        var stmt = con.createStatement();
        if(args.length == 0){
            stmt.executeUpdate("Create table if not exists products(pno int, price decimal, stock int)");
            stmt.executeUpdate("Insert into products values(101, 1500.00, 20), (102, 2000.00, 30), (103, 3500.00, 50), (104,5400.00, 65)");
            var rs = stmt.executeQuery("select pno, price , stock from products");
            while(rs.next()) {
                System.out.printf("%d\t%.2f\t%d%n", rs.getInt(1), rs.getDouble(2), rs.getInt("stock"));
            }
            
        }else{
            int id = Integer.parseInt(args[0]);
            int n = stmt.executeUpdate("update products set stock=stock+5 where pno=" + id);
            if(n == 0)
                System.out.println("No such product!");
        }
        stmt.close();
        con.close();
    }

}




// public static void main(String args) throws Exception {
//     var con = DriverManager.getConnection("jdbc:sqlite:shop.db");
//     var stmt = con.createStatement();
//     if(args.length == 0) {
//         stmt.executeUpdate("Create table if not exists products(pno int, price decimal, stock int) values(101, 1500.00, 20), (102, 2000.00, 30), (103, 3500.00, 50), (104,5400.00, 65)");
//         var rs = executeQuery("select * from products");
//         while(rs.next()) {
//             System.out.printf("%d\t%.2f\t%d%n", rs.getInt(1), rs.getDouble(2), rs.getInt("stock"));
//         }
//     } else {

//     }

// }