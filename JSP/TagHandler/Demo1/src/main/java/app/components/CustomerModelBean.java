package app.components;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class CustomerModelBean {
    private String id;

    public final String getId() {
        return id;
    }

   public boolean authenticate(String custId , String password) {
    try(var con = ShopDb.pool.getConnection()) {
            var stmt = con.prepareStatement("select count(cust_id) from cust_detail where cust_id=? and password_hash=?");
            stmt.setString(1 , custId);
            stmt.setString(2 , password);
            var rs = stmt.executeQuery();
            rs.next();
            int count = rs.getInt(1);
            stmt.close();
            rs.close();
            if(count == 1){
                id = custId;
                return true;
            }
            id = null;
            return false;
        }catch(Exception e){
            throw new RuntimeException(e);
        }
   }


    public List<OrderEntry> getOrders() {
        try(var con = ShopDb.pool.getConnection()) {
            var orders = new ArrayList<OrderEntry>();
            var stmt = con.prepareStatement("select product_id , quantity , order_date from orderdetail where cust_id = ?");
            stmt.setString(1 , id);
            var rs = stmt.executeQuery();
            while(rs.next()) {
                var order = new OrderEntry(rs);
                orders.add(order);
            }
            rs.close();
            stmt.close();
            return orders;
        }catch(SQLException e){
            throw new RuntimeException(e);
        }
    }

}