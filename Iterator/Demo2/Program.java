import java.util.*;

class Program
{
    public static void main(String[] args)
    {
        if (args.length == 0)
        {
            //Collection<Interval> store = new ArrayList<>();
            //Collection<Interval> store = new LinkedList<>();
            //Collection<Interval> store = new HashSet<>();
            Collection<Interval> store = new TreeSet<>();
            store.add(new Interval(7,31));
            store.add(new Interval(6,52));
            store.add(new Interval(5,63));
            store.add(new Interval(4,24));
            store.add(new Interval(3,45));
            store.add(new Interval(2,46));
            store.add(new Interval(1,17));
            for(var entry : store)
                System.out.println(entry);
        }else{
            //Map<String, Interval> store = new HashMap<>();
            Map<String, Interval> store = new TreeMap<>();
            store.put("Friday", new Interval(7,31));
            store.put("Thursday", new Interval(6,24));
            store.put("Wednesday", new Interval(5,25));
            store.put("Tuesday", new Interval(4,65));
            store.put("Monday", new Interval(3,41));
            Interval val = store.get(args[0]);
            if(val != null)
                System.out.printf("Interval : %s%n", val);
            else
                for(var entry : store.entrySet())
                    System.out.printf("%-12s%8s%n", entry.getKey(), entry.getValue());
        }
    }
}