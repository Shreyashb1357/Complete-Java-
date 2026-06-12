package app;
import java.util.stream.IntStream;
public class Program {

    static class Computation {
        private long start;

        public long compute(int first, int second) {
            start = System.nanoTime();
            return IntStream.range(first , second + 1)
                .mapToLong(Activity::perform)
                .sum();
        }

        public double time() {
            long stop = System.nanoTime();
            return (stop - start) / 1e9;
        }
    }

    public static void main(String[] args) {
        int n = Integer.parseInt(args[0]);
        System.out.println("Computing...");
        var c = new Computation();
        long r = c.compute(1,n);
        System.out.println("Done...");
        System.out.printf("Result  : %d , computation done in %.3f seconds.%n", r, c.time());
    }
}