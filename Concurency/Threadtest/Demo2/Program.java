package app;

public class Program {
    public static void main(String[] args) throws Throwable {
        var acc= new Jointacc();
        acc.credit(10000);
        System.out.printf("The Opening balance  : %d%n", acc.balance());
        
        Thread first = Thread.ofPlatform().start(()-> {
            System.out.println("The Jack is waithdrawing");
            if(acc.debit(6000) == false)
                System.out.println("The jack failed");
        });

        Thread second = Thread.ofPlatform().start(() -> {
            System.out.println("The Jill is waithdrawing");
            if(acc.debit(7000) == false)
                System.out.println("The jill failed");
        });
        first.join();
        second.join();
        System.out.printf("The Final balance  : %d%n", acc.balance());
        // long start = System.nanoTime();
        // System.out.println(start);
    }
}