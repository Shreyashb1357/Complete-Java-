package app.components;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;

public class OrderEntry {
    private int productNo;

    private int quantity;

    private Date orderDate;

    public OrderEntry(ResultSet source) throws SQLException {
        productNo = source.getInt("product_id");
        quantity = source.getInt("quantity");
        orderDate = source.getDate("order_date");
    }

    public final int getProductNo() {
        return productNo; 
    }

    public final int getQuantity() {
        return quantity;
    }

    public final String getOrderDate() {
        return String.format("%tF", orderDate);
    }

}