package edu.orderexp.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.sql.PreparedStatement;


import edu.orderexp.bean.Customer;
import edu.orderexp.util.DBConnector;


public class CustomerDao {
	private static Connection connection;
	String query = "";
	PreparedStatement ps;
	ResultSet rs;
	
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

		query = "INSERT INTO OrderExpress.Customer(cus_name, cus_password, cus_gender, cus_age, cus_email, cus_address, cus_phone)" +
		"value(?, ?, ?, ?, ?, ?, ?)";

		try {
			ps = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
			ps.setString(1, name);
			ps.setString(2, password);
			ps.setString(3, gender);
			ps.setInt(4, age);
			ps.setString(5, emailAddress);
			ps.setString(6, address);
			ps.setString(7, phone);

			ps.executeUpdate();

			rs = ps.getGeneratedKeys();

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
		} finally {
			if(rs != null) {
				try { rs.close(); } catch (SQLException e) {
					System.out.println("ResultSet failed to close! ");
				}
			}
			if(ps != null) {
				try { ps.close(); } catch (SQLException e2) {
					System.out.println("PreparedStatement failed to close! ");
				}
			}
		}
	}
	
	/**
	 * Get customer by email
	 * @param email
	 * @return Customer 
	 */
	public Customer getCustomerWithEmail(String email) {
		query = "SELECT * FROM OrderExpress.Customer WHERE cus_email=" + email;
		
		try {
			ps = connection.prepareStatement(query);
			
			rs = ps.executeQuery();
			Customer customer = new Customer(rs.getString(1), rs.getString(2), 
					rs.getString(3), rs.getString(4), rs.getInt(5), rs.getString(6), 
					rs.getString(7), rs.getString(8));
			return customer;
			
		} catch (SQLException e) {
			System.out.println("We can't get this customer by email! ");
			e.printStackTrace();
			return null;
		}
	}
	
	public static void authenticate(String userEmail, String password) {
        CallableStatement callstatement = null;
        try {
        	callstatement = connection.prepareCall("call login(?,?,?);");
            callstatement.setString(1, "siz16@pitt.edu");
            callstatement.setString(2, "12345567");
            callstatement.registerOutParameter(3, Types.INTEGER);
            callstatement.execute();
            System.out.println(callstatement.getInt(3));
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if(callstatement != null) {
				try { callstatement.close(); } catch (SQLException e) {
					System.out.println("Authenticate callable statement failed to close! ");
				}
			}
		}
	}
	/**
	 * @param email
	 * @return the email exists or not 
	 */
	public boolean notExist(String email) {
		boolean notExist = true;
		int count = 0;
		
		query = "SELECT COUNT(*) as CustomerCount FROM OrderExpress.Customer WHERE cus_email=" + email;
		
		try {
			ps = connection.prepareStatement(query);
			rs = ps.executeQuery();
			
			while(rs.next()) {
				count = rs.getInt("CustomerCount");
			}
			
			notExist = (count == 0)? true:false;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return notExist;
	}
}
