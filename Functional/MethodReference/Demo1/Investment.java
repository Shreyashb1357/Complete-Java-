class Investment
{
    private double installment;
    private int years;

    public Investment(double installment , int years)
    {
        this.installment = installment;
        this.years = years;
    }

    public double FutureValue(InterestRate rate)
    {
        double i = rate.getRate(years) / 100;
        return (installment / i) * (Math.pow(1 + i, years) - 1);
    }
}