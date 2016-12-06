package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import edu.orderexp.bean.Transaction;
import edu.orderexp.util.DBConnector;


public class TransactionDao implements Dao<Transaction> {
    String query = "";
    private DBConnector driver;

    public TransactionDao(DBConnector driver) {
        this.driver = driver;
        System.out.println("----------- TransactionDao Connection -----------");
    }

    /**
     * Insert record to TABLE Transaction
     *
     * @return automate generated Transaction_id
     */
    public int insertTransaction(int cusId, Date date, float price) {
        Connection connection = driver.connect();
        query = "INSERT INTO OrderExpress.Transaction(cus_id, tran_date, total_price)" +
                "VALUE(?, ?, ?)";

        try {
            PreparedStatement ps = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setInt(1, cusId);
            ps.setDate(2, date);
            ps.setFloat(3, price);

            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();

            if (rs.next()) {
                int autoKey = rs.getInt(1);
                return autoKey;
            } else {
                return -1;
            }

        } catch (SQLException e) {
            System.out.println("Transaction insertion failed!!!");
            e.printStackTrace();
            return -1;
        } finally {
            driver.close();
        }
    }

    @Override
    public List<Transaction> fetchAll() {
        return null;
    }

    @Override
    public Transaction fetchElementById(int id) {
        return null;
    }

    @Override
    public Transaction add(Transaction transaction) throws SQLException {
        return null;
    }

    @Override
    public boolean exist(Transaction transaction) {
        return false;
    }

    @Override
    public boolean updateById(int id, Transaction t) throws SQLException {
        return false;
    }

    @Override
    public boolean deleteById(int id) throws SQLException {
        return false;
    }
}
