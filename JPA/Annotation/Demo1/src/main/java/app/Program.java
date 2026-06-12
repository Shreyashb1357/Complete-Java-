package app;
import app.Shopping.Data.*;
import java.util.Properties;
import jakarta.persistence.Persistence;

public class Program {
    
    public static void main(String[] args) throws Exception {
        var setting = new Properties();
        setting.put("jakarta.persistence.jdbc.url" , "jdbc:oracle:thin:@//metiitdac.met.edu/xepdb1");
        setting.put("jakarta.persistence.jdbc.user", "dac4");
        setting.put("jakarta.persistence.jdbc.password", "metiit");

        var emf = Persistence.createEntityManagerFactory("app.data",setting);
        var em = emf.createEntityManager();
        if(args.length > 2) {
            var query = em.createQuery("select p from ProductEntity p" , ProductEntity.class);
            for(var entry  : query.getResultList() ){
                System.out.printf("%d\t%.2f\t%d%n" , entry.getproductNo() , entry.getPrice() , entry.getStock());
            }
        }
        else{
            int id = Integer.parseInt(args[0]);
            var product = em.find(ProductEntity.class , id);
            if(product != null) {
                for(var entry : product.getOrders()){
                    System.out.printf("%s\t%d\t%tF%n", entry.getCustId(), entry.getQty() , entry.getOrderDate());
                }
            }else{
                    System.out.println("No such Product!");
            }
        }
        em.close();
    }

}


