package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.CallableStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import edu.orderexp.bean.Dish;
import edu.orderexp.bean.Transaction;
import edu.orderexp.util.DBConnector;


public class TransactionDao implements Dao<Transaction> {
	final static Logger logger = Logger.getLogger(TransactionDao.class);
    private DBConnector driver;

    public TransactionDao(DBConnector driver) {
        this.driver = driver;
        System.out.println("----------- TransactionDao Connection -----------");
    }

    @Override
    public List<Transaction> fetchAll() {
        return null;
    }
    
    //fetch transactions for one customer
    public List<Transaction> fetchAllbyCusId(int cus_id) {
    	Connection conn = driver.connect();
    	CallableStatement cs = null;
    	ResultSet rs = null;
    	List<Transaction> trans = new ArrayList<>();
    	
    	String query = "{CALL get_tran_by_cus_id(?)}";
    
    	try {
    		cs = conn.prepareCall(query);
    		cs.setInt(1, cus_id);
    		rs = cs.executeQuery();
    		
    		Transaction transaction = null;
    		int tran_id = -1;
    		
    		while(rs.next()) {
    			tran_id = rs.getInt("tran_id");
    			
				transaction = new Transaction(tran_id);
				transaction.setTime(rs.getDate("tran_date"));
				transaction.setPrice(rs.getFloat("total_price"));
				transaction.addRestaurant(rs.getInt("res_id"), rs.getString("res_name"));	
				
				trans.add(transaction);
    		}
    		
    		if(tran_id == -1) {
    			logger.info(cus_id + "has no transaction records. ");
    			return null;
    		} else {
    			return trans;
    		}
    				
		} catch (SQLException e) {
			logger.error("Retrieve transactions history by customer ID failed. ", e);
			return null;
		}
    }
    
    public List<Map<String, Object>> fetchDetailbyTranId(int tran_id) {
    	Connection conn = driver.connect();
    	CallableStatement cs = null;
    	ResultSet rs = null;
    	List<Map<String, Object>> details = new ArrayList<>();
    	
    	String query = "{CALL get_tran_detail_by_tran_id(?)}";
    	
    	try {
			cs = conn.prepareCall(query);
			cs.setInt(1, tran_id);
			rs = cs.executeQuery();
			
			while(rs.next()) {
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
			
			if (details == null || details.size() == 0) {
				return null;
			} else {
				return details;
			}
		} catch (SQLException e) {
			logger.error("Fetch transaction details failed. ", e);
			return null;
		} 
    }
    
    //fetch all transactions for one restaurant
    public List<Transaction> fetchAllbyResId(int res_id) {
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
    		
    		while(rs.next()) {
    			tran_id = rs.getInt("tran_id");
    			if(!idToTrans.containsKey(tran_id)) {
    				transaction = new Transaction(tran_id);
    				transaction.setCusId(rs.getInt("cus_id"));
    				transaction.setTime(rs.getDate("tran_date"));
    			} else {
    				transaction = idToTrans.get(tran_id);
    			}
    			
    			Dish dish = new Dish(rs.getInt("dish_id"), rs.getString("dish_name"),
						rs.getString("description"), rs.getString("pic_path"), rs.getFloat("price"));
				
				transaction.addDish(dish, rs.getInt("quantity"));
				
				idToTrans.put(tran_id, transaction);
    		}
    		
    		if(tran_id == -1) {
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
       		cs.setInt(1, t.getCusId());
    		
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
