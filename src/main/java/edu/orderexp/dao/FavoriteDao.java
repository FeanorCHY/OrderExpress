package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import edu.orderexp.util.DBConnector;


public class FavoriteDao {
	private Connection connection;
	String query = "";
	
	public FavoriteDao() {
		connection = new DBConnector().connect();// quick fix
		System.out.println("----------- FavoriteDao Connection -----------");
	}
	
	/**
	 * Insert record to TABLE TransactionDish
	 * @return automate generated TransactionDish_id
	 */
	public int insertTransactionDish(int curId, int dishId) {

		query = "INSERT INTO OrderExpress.favorite(cus_id, dish_id)" + "value(?, ?)";

		try {
			PreparedStatement ps = connection.prepareStatement(query);
			ps.setInt(1, curId);
			ps.setInt(2, dishId);

			int res = ps.executeUpdate();
			return res;

		} catch (SQLException e) {
			System.out.println("Favorite insertion failed!!!");
			e.printStackTrace();
			return -1;
		}
	}
}
