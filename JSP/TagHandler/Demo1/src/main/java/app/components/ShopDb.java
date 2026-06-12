package app.components;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class ShopDb {
    public static final HikariDataSource pool = new HikariDataSource(new HikariConfig("db.properties"));
}