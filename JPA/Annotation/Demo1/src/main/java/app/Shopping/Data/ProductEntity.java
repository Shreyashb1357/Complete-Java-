package app.Shopping.Data;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class ProductEntity {
    
    @Id
    @Column(name = "pno")
    private int productNo;

    @Basic
    @Column(name = "price")
    private double price;

    @Basic
    @Column(name = "stock")
    private int stock;

    //@OneToMany(mappedBy = "product", cascade = CascadeType.REFRESH)
    @OneToMany(mappedBy = "product" , cascade = CascadeType.REFRESH)
    private List<OrderEntity> orders = new ArrayList<>();

    
    public int getproductNo(){
        return productNo;
    }
    public void setproductNo(int v){
        productNo = v;
    }

    public double getPrice(){
        return price;
    }
    public void setPrice(double v){
        price = v;
    }

    public int getStock() {
        return stock;
    }
    public void setStock(int v){
        stock = v;
    }

    public List<OrderEntity> getOrders(){
        return orders;
    }
    public void setOrders(List<OrderEntity> v){
        orders = v;
    }


}