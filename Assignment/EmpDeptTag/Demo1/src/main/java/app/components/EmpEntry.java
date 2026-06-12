package app.components;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

public class EmpEntry {
    private int eId;
    private int hId;
    private Timestamp Adate;
    private String description;


    public EmpEntry(ResultSet s) throws SQLException {
        eId = s.getInt("emp_id");
        hId = s.getInt("history_id");
        Adate = s.getTimestamp("action_date");
        description = s.getString("action_description");
    }
    public EmpEntry() {}

    public int getEId(){
        return eId;
    }

    public int getHId(){
        return hId;
    }

    public Timestamp getAdate() {
        return Adate;
    }

    public String getDesc() {
        return description;
    }

    public void setEId(int v) {
        eId = v;
    }
    public void setHId(int h){
        hId = h;
    }
    public void setAdate(Timestamp a){
        Adate = a;
    }
    public void setDesc(String d) {
        description = d;
    }


}
