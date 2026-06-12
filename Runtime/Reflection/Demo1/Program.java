public class Program
{
    private static void present(Record info) throws Exception {
        Class<?> c = info.getClass();
        System.out.printf("<%s>%n", c.getSimpleName());
        for(var a : c.getRecordComponents()) {
            String element = a.getName();
            Object b = a.getAccessor().invoke(info);
            System.out.printf("     <%1$s>%2$s<%1$s>%n",element , b);
        }
        System.out.printf("<%s>%n", c.getSimpleName());
    }


    public static void main(String[] args) throws Exception
    {
            Item x = Shop.popularItem();
            present(x);
            System.out.println("==================================");
            Customer b = Shop.BestCustomer();
            present(b);
    }
}