import java.util.Scanner;
public class Program
{

    static class SafeScheme implements InterestRate
    {
        public double getRate(int years)
        {
            return years > 3 ? 7 : 6;
        }
    }

    public static void main(String[] args)
    {
        var input = new Scanner(System.in);
        System.out.println("Amount and period : ");
        double a = input.nextDouble();
        int b = input.nextInt();
        Investment inv = new Investment(a , b);
        System.out.printf("The Future value of riskless = %.2f%n", inv.FutureValue(new SafeScheme()));


    }
}