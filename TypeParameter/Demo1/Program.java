public class Program
{
    public static Object select(int count, Object first, Object second)
    {
        if(count%2 == 0)
            return first;
        return second;
    }

    public static < T extends Comparable<T>> T select(T first, T second)
    {
        if(first.compareTo(second) > 0)
            return first;
        return second;
    }


    public static void main(String[] args)
    {
        if(args.length > 0)
        {
            int m = Integer.parseInt(args[0]);
            String ss = (String)select(m , "Monday", "Sunday");
            System.out.printf("The day is : %s%n", ss);

            double sa = (double)select(m, 7.5 , 5.6);
            System.out.printf("The number is : %.2f%n", sa);

            select(m, 7.5, "Wednesday");

            Interval i = (Interval)select(m, new Interval(3,45), new Interval(8 , 60));
            System.out.printf("The Interval is : %s%n", i);
        }
        else{
            String ss = (String)select("Monday" , "Sunday");
            System.out.printf("The day is : %s%n", ss);
            double sa = (double)select(123.02, 410.20);
            System.out.printf("The number is : %.2f%n", sa);
            Interval i = select(new Interval(8,65), new Interval(1 , 70));
            System.out.printf("The Interval is : %s%n", i);
        }

    }
}