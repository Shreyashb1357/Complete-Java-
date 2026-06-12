package app.components;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EmployeeBean {
    private String enme;
    public String getEnme(){
        return enme;
    }

    public boolean authenticate(String enames , double deptnos) {
        try(var con = ShopDb.pool.getConnection()){
            var stmt = con.prepareStatement("select count(empno) from emp where ename = ? and deptno = ?");
            stmt.setString(1, enames);
            stmt.setDouble(2, deptnos);
            var rs = stmt.executeQuery();
            rs.next();
            int count = rs.getInt(1);
            rs.close();
            stmt.close();
            if(count == 1){
                enme = enames;
                return true;
            }
            enme = null;
            return false;
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }


}