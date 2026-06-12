import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

public class Program
{
    public static void main(String[] args) throws Exception
    {
        class Supplier {
            final String name;
            final String item;
            final int quantity;

            Supplier(String row)
            {
                String[] content = row.split(",");
                name = content[0];
                item = content[1];
                quantity = Integer.parseInt(content[2]);
            }
    }

    var doc = Path.of("suppliers.csv");
    List<Supplier> supplier = Files.readAllLines(doc).stream()
        .skip(1)
        .map(Supplier::new)
        .collect(Collectors.toList());

    if(args.length == 0)
    {
        supplier.stream()
            .sorted((a,b)-> a.quantity - b.quantity)
            .forEach(s -> System.out.printf("%-12s%-12s%8d%n", s.name, s.item, s.quantity));
    }else{
         int total = supplier.stream()
                .filter(s -> s.item.equals(args[0]))
                .mapToInt(s -> s.quantity)
                .sum();
            System.out.printf("Total supply for %s is %d%n", args[0], total);
    }
    }
}