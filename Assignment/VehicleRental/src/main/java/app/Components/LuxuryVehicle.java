package app.components;


public class LuxuryVehicle extends Vehicle
{
    private int luxTax = 8;


    @Override
    public int calculateRent(int days) {
        if(days <= 0) {
            System.out.println("Invalid Input...");
            return 0;
        }else{
            return days * baseRentPerDay * luxTax;
        }
    }
}