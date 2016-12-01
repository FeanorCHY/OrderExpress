package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.util.List;

import edu.orderexp.bean.Dish;
import edu.orderexp.util.DBConnector;


public class DishDao implements Dao<Dish>{
	private DBConnector driver;
	String query = "";
	
	public DishDao(DBConnector driver) {
		this.driver = driver;
		System.out.println("----------- DishDao Connection -----------");
	}
	
	/**
	 * Insert record to TABLE customer
	 * @return automate generated customer_id
	 */
	public int insertDish(String name, String description, String pic_path, int restId, 
		float price) throws SQLException {
		Connection connection = driver.connect();
		query = "INSERT INTO OrderExpress.dish(dish_name, description, pic_path, rest_id, price)" +
		"value(?, ?, ?, ?, ?)";

		try {
			PreparedStatement ps = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
			ps.setString(1, name);
			ps.setString(2, description);
			ps.setString(3, pic_path);
			ps.setInt(4, restId);
			ps.setFloat(5, price);

			ps.executeUpdate();

			ResultSet rs = ps.getGeneratedKeys();

			if(rs.next()) {
				int autoKey = rs.getInt(1);
				return autoKey;
			} else {
				return -1;
			}

		} catch (SQLException e) {
			System.out.println("Dish insertion failed!!!");
			e.printStackTrace();
			return -1;
		}finally {
			connection.close();
		}
	}

	@Override
	public List<Dish> fetchAll() {
		return null;
	}

	@Override
	public Dish fetchElementById(int id) {
		return null;
	}

	@Override
	public Dish add(Dish dish) throws SQLException {
		return null;
	}

	@Override
	public boolean exist(Dish dish) {
		return false;
	}

	@Override
	public boolean updateById(int id) throws SQLException {
		return false;
	}

	@Override
	public boolean deleteById(int id) throws SQLException {
		return false;
	}
}
