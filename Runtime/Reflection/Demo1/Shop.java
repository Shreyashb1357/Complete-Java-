record Item(String Name, String Brand, int stock) {}

record Customer(String Id, double Purchase , int rating) {}

public class Shop
{
    public static Item popularItem() {
        return new Item("CPU" , "Intel", 500);
    }

    public static Customer BestCustomer()
    {
        return new Customer("Shreyash", 50000, 5);
    }
}