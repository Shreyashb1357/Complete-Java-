import common.*;

public class Program
{

    public static void main(String[] args)
    {
        SimpleStack<String> a = new SimpleStack<String>();
        a.push("Monday");
        a.push("Tuesday");
        a.push("Wednesday");
        a.push("Thursday");
        for(var i = a.iterator(); i.hasNext();)
            System.out.println(i.next());
        System.out.println("===============");

        SimpleStack<Interval> b = new SimpleStack<>(); 
        b.push(new Interval(4, 31));
        b.push(new Interval(7, 42));
        b.push(new Interval(5, 13));
        b.push(new Interval(3, 24));
        
        System.out.println("===============");  
        for(var i = a.iterator(); i.hasNext();)
            System.out.println(i.next());
        System.out.println("===============");
        System.out.println("===============");
    }
}