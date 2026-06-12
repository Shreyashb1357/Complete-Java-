package app.Shopping.Data;
import java.util.*;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class OrderEntity {
    
    @Id
    @Column(name="ord_no")
    private int orderNo;

    @Basic
    @Column(name = "ord_Date")
    private Date orderDate;

    @Basic
    @Column(name = "cust_Id")
    private String custId;

    @Basic
    @Column(name = "qty")
    private int qty;

    @ManyToOne
    @JoinColumn(name = "pno")
    private ProductEntity product;

    public int getOrderNo(){
        return orderNo;
    }
    public void setOrderNo(int v){
        orderNo = v;
    }

    public Date getOrderDate(){
        return orderDate;
    }
    public void setOrderDate(Date v){
        orderDate = v;
    }

    public String getCustId() {
        return custId;
    }
    public void setCustId(String v){
        custId = v;
    }

    public int getQty(){
        return qty;
    }
    public void setQty(int v){
        qty = v;
    }

    public ProductEntity getProduct() {
        return product;
    }
    public void setProduct(ProductEntity v){
        product = v;
    }

}