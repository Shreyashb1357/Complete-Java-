package app.data.shopping;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Basic;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name="orders")
public class OrderEntity {

    @Id
    @Column(name="ord_no")
    private int orderId;

    @Basic
    @Column(name="cust_id")
    private String custId;

    @Basic
    @Column(name="pno")
    private int pNo;

    @Basic
    @Column(name="qty")
    private int quantity;


    public int getOrderId(){
        return orderId;
    }
    public void setOrderId(int id){
        orderId = id;
    }

    public String getCustId(){
        return custId;
    }
    public void setCustId(String id){
        custId = id;
    }

    public int getPNo(){
        return pNo;
    }
    public void setPNo(int id){
        pNo = id;
    }

    public int getQuantity(){
        return quantity;
    }
    public void setQuantity(int id){
        quantity = id;
    }
}