package app.components;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.Date;
import java.sql.Timestamp;

public class EmployeeBean {
    private String empName;
    private int employeeId;
    public String getEmpName() {
        return empName;
    }

    // public String getName() {
    //     var con = ShopDb.pool.getConnection();
    //     var stmt = con.prepareStatement("select emp_name from emp where ")
    // }
    private String name;

    public String getName() {
        return name;
    }

    public boolean authenticate(String eId , String ePwd) {
        try(var con = ShopDb.pool.getConnection()){
            var stmt = con.prepareStatement("select count(username) from emp where username = ? and password = ?");
            stmt.setString(1 , eId);
            stmt.setString(2 , ePwd);
            var rs = stmt.executeQuery();
            rs.next();
            int count = rs.getInt(1);
            rs.close();
            stmt.close();
            

            if(count == 1){
                stmt = con.prepareStatement(
                    "SELECT emp_name FROM emp WHERE username = ?"
                );
                stmt.setString(1, eId);

                rs = stmt.executeQuery();
                rs.next();
                String n = rs.getString(1);
                rs.close();
                stmt.close();

                stmt = con.prepareStatement("select emp_id from emp where username = ?");
                stmt.setString(1,eId);
                rs = stmt.executeQuery();
                rs.next();
                int i = rs.getInt(1);
                rs.close();
                stmt.close();

                empName = eId;
                name = n;
                employeeId = i;
                return true;
            }
            empName = null;
            return false;
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    public List<EmpEntry> getDetailsEmp() {
        try(var con = ShopDb.pool.getConnection()) {
            var details = new ArrayList<EmpEntry>();
            var stmt = con.prepareStatement("select history_id , emp_id, action_date, action_description  from emp_history where emp_id = ?");
            stmt.setInt(1 , employeeId);
            var rs = stmt.executeQuery();
            while(rs.next()){
                var data = new EmpEntry(rs);
                details.add(data);
            }
            rs.close();
            stmt.close();
            return details;
        }catch(SQLException e){
            throw new RuntimeException(e);
        }
    }

    public boolean addEmp(EmpRegister e) {
        try(var con = ShopDb.pool.getConnection()) {
            var stmt = con.prepareStatement("INSERT INTO emp (emp_name, username, password, email, phone, hire_date, dept_id) VALUES (? ,?, ?, ?, ?, ?, ?)");
            stmt.setString(1 , e.getEname());
            stmt.setString(2 , e.getUser());
            stmt.setString(3 , e.getPassword());
            stmt.setString(4 , e.getEmail());
            stmt.setString(5 , e.getMobile());
            java.sql.Date sqlDate = new java.sql.Date(e.getHDate().getTime());
            stmt.setDate(6, sqlDate);
            stmt.setInt(7 , e.getDept());
            
            var rs = stmt.executeUpdate();
            stmt.close();
            con.close();
            return rs == 1;
        }catch(SQLException eee){
            throw new RuntimeException(eee);
            
        }
    }

    public boolean addHistory(EmpEntry etr) {
        try(var con = ShopDb.pool.getConnection()) {
            var stmt = con.prepareStatement("select count(emp_id) from emp where emp_id = ?");
            stmt.setInt(1 , etr.getEId());
            var rs = stmt.executeQuery();
            rs.next();
            int count = rs.getInt(1);
            rs.close();
            stmt.close();


            if(count == 1) {
                stmt = con.prepareStatement("INSERT INTO emp_history (emp_id, action_date, action_description) VALUES (? , ? , ?)");
                stmt.setInt(1 , etr.getEId());
                java.sql.Timestamp sqlDateTime =new java.sql.Timestamp(etr.getAdate().getTime());           
                stmt.setTimestamp(2, sqlDateTime);
                stmt.setString(3 , etr.getDesc());

                stmt.executeUpdate();
                stmt.close();
                con.close();
                return true;
            }
            return false;
        }catch(SQLException ee) {
            throw new RuntimeException(ee);   
        }
    }
}