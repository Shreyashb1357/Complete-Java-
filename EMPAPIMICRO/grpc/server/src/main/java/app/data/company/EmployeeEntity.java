package app.data.company;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name="Employees")
public class EmployeeEntity {

    @Id
    @Column(name="EmpId")
    private int eId;

    @Column(name="EmpName")
    private String empName;

    @Column(name="Age")
    private int age;

    @Column(name="Salary")
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