package app;
public class Jointacc {
    private int balance;

    public int balance() {
        return balance;
    }

    public boolean debit(int amt) {
        boolean success = false;
        synchronized(this) {
        if(balance >= amt) {
            balance = Activity.perform(balance, amt, -1);
            success = true;
        } }
        return success;
    }

    public synchronized void credit(int amount) {
        balance = Activity.perform(balance, amount, +1);
    }
}