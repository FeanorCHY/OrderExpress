package edu.orderexp.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnector {
	
	//static reference to itself
	private static DBConnector instance = new DBConnector();
	
	public static final String DRIVER_CLASS = "com.mysql.jdbc.Driver";
	public static final String URL = "jdbc:mysql://ordere.cwixsruv8ard.us-east-2.rds.amazonaws.com:3306/OrderExpress";
	public static final String USER = "hoc";
	public static final String PASSWORD = "ccchhhyyy";

	//private constructor
	public DBConnector() {
		
		System.out.println("----MySQL JDBC Connection Testing -------");
		
		try {
			Class.forName(DRIVER_CLASS);
		} catch (ClassNotFoundException e) {
			System.out.println("Where is your MySQL JDBC Driver?");
			e.printStackTrace();
		}
		
		System.out.println("MySQL JDBC Driver Registered!");
	}
	
	private Connection createConnection() {
		Connection connection = null;
		try {
			connection = DriverManager.getConnection(URL, USER, PASSWORD);
		} catch (SQLException e) {
			//handle exception
			System.out.println("ERROR: Connection Failed!");
		}
		
		if(connection != null) 
			System.out.println("SUCCESS!!!! Database Connected! ");
		return connection;
	}
	
	public static Connection getConnection() {
		return instance.createConnection();
	}
}
