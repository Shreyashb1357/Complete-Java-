package app.data.company;

public class EmployeeEntry {

    private int eId;

    private String empName;

    private int age;

    private double salary;

    public String getEmpName(){
        return empName;
    }
    public void setEmpName(String name){
        empName = name;
    }

    public int getAge(){
        return age;
    }
    public void setAge(int age){
        this.age = age;
    }

    public double getSalary(){
        return salary;
    }
    public void setSalary(double salary){
        this.salary = salary;
    }

    public int getEId(){
        return eId;
    }
    public void setEId(int id){
        eId = id;
    }
}