package app;

public class Program {

    static String manager;

    static void handleJob(int jid) {

        
        System.out.printf("Thread<%x> has accepted job<%d> for %s%n", Thread.currentThread().hashCode(), jid, manager);
        Activity.perform(jid);
        System.out.printf("Thread<%x> has finished job<%d> for %s%n", Thread.currentThread().hashCode(), jid, manager);
    }


    public static void main(String[] args) {
        int n = args.length > 0 ? Integer.parseInt(args[0]) : 1;
        Thread child = new Thread(()-> {
             manager = "Jack";
            handleJob(n);
        });
        child.setDaemon(n>5);
        child.start();
        manager = "Jill";
        handleJob(2);
    }
}