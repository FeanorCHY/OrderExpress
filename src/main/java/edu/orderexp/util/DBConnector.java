package edu.orderexp.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnector {
    private final String DRIVER_CLASS = "com.mysql.jdbc.Driver";
    private final String URL = "jdbc:mysql://ordere.cwixsruv8ard.us-east-2.rds.amazonaws.com:3306/OrderExpress";
    private final String USER = "hoc";
    private final String PASSWORD = "ccchhhyyy";
    private Connection conn = null;

    //private constructor
    public DBConnector() {
        try {
            Class.forName(DRIVER_CLASS);
        } catch (ClassNotFoundException e) {
            System.out.println("Where is your MySQL JDBC Driver?");
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
        return this.conn;
    }

    public void close() {
        try {
            this.conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Connection connect() {
        try {
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            //handle exception
            System.out.println("ERROR: Connection Failed!");
        }
        return conn;
    }
}
