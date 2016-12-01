package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import edu.orderexp.util.DBConnector;


public class TransactionDishDao {
	private Connection connection;
	String query = "";
	
	public TransactionDishDao() {
		connection = DBConnector.getConnection();
		System.out.println("----------- TransactionDishDao Connection -----------");
	}
	
	/**
	 * Insert record to TABLE TransactionDish
	 * @return automate generated TransactionDish_id
	 */
	public int insertTransactionDish(int tranId, int dishId, int qty) {

		query = "INSERT INTO OrderExpress.transaction_dish(tran_id, dish_id, quantity)" +
		"value(?, ?, ?)";

		try {
			PreparedStatement ps = connection.prepareStatement(query);
			ps.setInt(1, tranId);
			ps.setInt(2, dishId);
			ps.setInt(3, qty);

			int res = ps.executeUpdate();
			return res;

		} catch (SQLException e) {
			System.out.println("TransactionDish insertion failed!!!");
			e.printStackTrace();
			return -1;
		}
	}
}
