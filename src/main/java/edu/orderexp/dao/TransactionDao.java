package edu.orderexp.dao;

import edu.orderexp.bean.Dish;
import edu.orderexp.bean.Restaurant;
import edu.orderexp.bean.Transaction;
import edu.orderexp.util.DBConnector;
import org.apache.log4j.Logger;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class TransactionDao implements Dao<Transaction> {
    final static Logger logger = Logger.getLogger(TransactionDao.class);
    private DBConnector driver;

    public TransactionDao(DBConnector driver) {
        this.driver = driver;
    }

    @Override
    public List<Transaction> fetchAll() {
        return null;
    }

    // fetch transactions for one customer
    public HashMap<Integer, Transaction> fetchAllByCusId(int cus_id) {
        Connection conn = driver.connect();
        CallableStatement cs;
        ResultSet rs;
        HashMap<Integer, Transaction> transactions = new HashMap<>();

        String query = "{CALL get_tran_by_cus_id(?)}";
        boolean hasRecord = false;
        try {
            cs = conn.prepareCall(query);
            cs.setInt(1, cus_id);
            rs = cs.executeQuery();
            while (rs.next()) {
                hasRecord = true;
                int tran_id = rs.getInt("tran_id");
                Restaurant restaurant = new Restaurant(rs.getInt("res_id"), rs.getString("res_name"));
                Transaction transaction;
                if (transactions.containsKey(tran_id)) {
                    transaction = transactions.get(tran_id);
                } else {
                    transaction = new Transaction(tran_id, rs.getDate("tran_date"), rs.getFloat("total_price"));
                    transaction.setCus_id(cus_id);
                }
                transaction.addRestaurant(restaurant);
                transactions.put(tran_id, transaction);
            }
        } catch (Exception e) {
            logger.error("Retrieve transactions history by customer ID failed. ", e);
        }
        if (!hasRecord) {
            logger.info(cus_id + " has no transaction records. ");
            return null;
        } else {
            return transactions;
        }
    }

    public List<Map<String, Object>> fetchDetailByTranId(int tran_id) {
        Connection conn = driver.connect();
        CallableStatement cs = null;
        ResultSet rs = null;
        List<Map<String, Object>> details = new ArrayList<>();

        String query = "{CALL get_tran_detail_by_tran_id(?)}";

        try {
            cs = conn.prepareCall(query);
            cs.setInt(1, tran_id);
            rs = cs.executeQuery();

            while (rs.next()) {
                Map<String, Object> d = new HashMap<>();
                d.put("dish_id", rs.getInt("dish_id"));
                d.put("dish_name", rs.getString("dish_name"));
                d.put("price", rs.getFloat("price"));
                d.put("pic_path", rs.getString("pic_path"));
                d.put("quantity", rs.getInt("quantity"));
                d.put("res_id", rs.getInt("res_id"));
                d.put("res_name", rs.getString("res_name"));

                details.add(d);
            }
        } catch (SQLException e) {
            logger.error("Fetch transaction details failed. ", e);
            return null;
        }

        if (details.size() == 0) {
            return null;
        } else {
            return details;
        }
    }

    //fetch all transactions for one restaurant
    public List<Transaction> fetchAllByResId(int res_id) {
        Connection conn = driver.connect();
        CallableStatement cs = null;
        ResultSet rs = null;

        String query = "{CALL get_res_tran_history_by_res_id(?)}";

        Map<Integer, Transaction> idToTrans = new HashMap<>();

        try {
            cs = conn.prepareCall(query);
            cs.setInt(1, res_id);
            rs = cs.executeQuery();

            Transaction transaction = null;
            int tran_id = -1;

            while (rs.next()) {
                tran_id = rs.getInt("tran_id");
                if (!idToTrans.containsKey(tran_id)) {
                    transaction = new Transaction(tran_id);
                    transaction.setCus_id(rs.getInt("cus_id"));
                    transaction.setTran_date(rs.getDate("tran_date"));
                } else {
                    transaction = idToTrans.get(tran_id);
                }

                Dish dish = new Dish(rs.getInt("dish_id"), rs.getString("dish_name"), rs.getString("description"), rs.getString("pic_path"), rs.getFloat("price"));

                transaction.addDish(dish, rs.getInt("quantity"));

                idToTrans.put(tran_id, transaction);
            }

            if (tran_id == -1) {
                logger.info(res_id + "has no transaction records. ");
                return null;
            } else {
                return new ArrayList(idToTrans.values());
            }

        } catch (SQLException e) {
            logger.error("Retrieve transactions history by restaurant ID failed. ", e);
            return null;
        }
    }

    @Override
    public Transaction fetchElementById(int id) {
        return null;
    }

    //Add new transaction
    @Override
    public Transaction add(Transaction t) throws SQLException {
        Connection conn = driver.connect();
        CallableStatement cs = null;
        ResultSet rs = null;
        String query = "{CALL add_newTransaction(?, ?, ?, ?)}";

        try {
            cs = conn.prepareCall(query);
            cs.setInt(1, t.getCus_id());

            //current date
            Date date = new Date(System.currentTimeMillis());
            cs.setDate(2, date);

            //cs.setArray(3, x);
            return t;

        } catch (SQLException e) {
            logger.error("Transaction creation and insertion failed", e);
            return null;
        }

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
