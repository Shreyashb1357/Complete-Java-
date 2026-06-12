package app.components;


public class Vehicle 
{
    private int vehicleNo;
    private String vehicleName;
    protected int maxSpeed = 120;
    protected int baseRentPerDay = 500;
    

    public int calculateRent(int days) {
        if(days <= 0) {
            System.out.println("Invalid Input...");
            return 0;
        }else{
            return days * baseRentPerDay;
        }
    }

}