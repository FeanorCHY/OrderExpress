package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

import edu.orderexp.util.DBConnector;


public class TransactionDao {
	private Connection connection;
	String query = "";
	
	public TransactionDao() {
		connection = DBConnector.getConnection();
		System.out.println("----------- TransactionDao Connection -----------");
	}
	
	/**
	 * Insert record to TABLE Transaction
	 * @return automate generated Transaction_id
	 */
	public int insertTransaction(int cusId, Date date, float price) {

		query = "INSERT INTO OrderExpress.Transaction(cus_id, tran_date, total_price)" +
		"value(?, ?, ?)";

		try {
			PreparedStatement ps = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
			ps.setInt(1, cusId);
			ps.setDate(2, date);
			ps.setFloat(3, price);

			ps.executeUpdate();

			ResultSet rs = ps.getGeneratedKeys();

			if(rs.next()) {
				int autoKey = rs.getInt(1);
				return autoKey;
			} else {
				return -1;
			}

		} catch (SQLException e) {
			System.out.println("Transaction insertion failed!!!");
			e.printStackTrace();
			return -1;
		}
	}
}
