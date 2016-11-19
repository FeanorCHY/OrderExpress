package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import edu.orderexp.util.DBConnector;


public class CustomerDao {
	private Connection connection;
	String query = "";
	
	public CustomerDao() {
		connection = DBConnector.getConnection();
		System.out.println("----------- CustomerDao Connection -----------");
	}
	
	/**
	 * Insert record to TABLE customer
	 * @return automate generated customer_id
	 */
	public int insertCustomer(String name, String password, String gender, int age, 
		String emailAddress, String address, String phone) {

		query = "INSERT INTO OrderExpress.Customer(cus_name, cus_password, gender, age, email_address, address, phone_number)" +
		"value(?, ?, ?, ?, ?, ?, ?)";

		try {
			PreparedStatement ps = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
			ps.setString(1, name);
			ps.setString(2, password);
			ps.setString(3, gender);
			ps.setInt(4, age);
			ps.setString(5, emailAddress);
			ps.setString(6, address);
			ps.setString(7, phone);

			ps.executeUpdate();

			ResultSet rs = ps.getGeneratedKeys();

			if(rs.next()) {
				int autoKey = rs.getInt(1);
				return autoKey;
			} else {
				return -1;
			}

		} catch (SQLException e) {
			System.out.println("Customer insertion failed!!!");
			e.printStackTrace();
			return -1;
		}
	}
}
