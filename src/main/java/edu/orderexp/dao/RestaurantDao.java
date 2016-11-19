package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import edu.orderexp.util.DBConnector;

public class RestaurantDao {
	private Connection connection;
	String query = "";
	
	public RestaurantDao() {
		connection = DBConnector.getConnection();
		System.out.println("----------- RestaurantDao Connection -----------");
	}
	
	/**
	 * Insert record to TABLE restaurant
	 * @return automate generated restaurant_id
	 */
	public int insertRestaurant(String name, String password, String address, String phone, 
		String type, int deliveryTime, int favTimes) {

		query = "INSERT INTO OrderExpress.Customer(res_name, res_password, res_address, res_phone, res_type, res_delivery_time, res_favor_times)" +
		"value(?, ?, ?, ?, ?, ?, ?)";

		try {
			PreparedStatement ps = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
			ps.setString(1, name);
			ps.setString(2, password);
			ps.setString(3, address);
			ps.setString(4, phone);
			ps.setString(5, type);
			ps.setInt(6, deliveryTime);
			ps.setInt(7, favTimes);

			ps.executeUpdate();

			ResultSet rs = ps.getGeneratedKeys();

			if(rs.next()) {
				int autoKey = rs.getInt(1);
				return autoKey;
			} else {
				return -1;
			}

		} catch (SQLException e) {
			System.out.println("Restaurant insertion failed!!!");
			e.printStackTrace();
			return -1;
		}
	}
}

