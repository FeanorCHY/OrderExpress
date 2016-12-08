package edu.orderexp.dao;

import edu.orderexp.bean.Dish;
import edu.orderexp.util.DBConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;


public class DishDao implements Dao<Dish> {
	final static Logger logger = Logger.getLogger(RestaurantDao.class);
    private DBConnector driver;

    public DishDao(DBConnector driver) {
        this.driver = driver;
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
    	Connection conn = driver.connect();
    	PreparedStatement ps = null;
    	ResultSet rs = null;
        String query = "INSERT INTO OrderExpress.dish(dish_name, description, pic_path, rest_id, price, stock)" + "VALUE(?, ?, ?, ?, ?, ?)";

        try {
            ps = conn.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, dish.getDish_name());
            ps.setString(2, dish.getDescription());
            ps.setString(3, dish.getPic_path());
            ps.setInt(4, dish.getRest_id());
            ps.setFloat(5, dish.getPrice());
            ps.setInt(6, dish.getStock());

            ps.executeUpdate();

            rs = ps.getGeneratedKeys();

            if (rs.next()) {
                dish.setDis_id(rs.getInt(1));
                logger.info(dish.getDish_name() + "has been added to restaurant" 
                		+ dish.getRest_id() + " successfully. ");  
                return dish;
            } else {
                return null;
            }

        } catch (SQLException e) {
            logger.error("Dish insertion failed. ", e);
            return null;
        } finally {
        	if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
        }
    }

    @Override
    public boolean exist(Dish dish) {
        return false;
    }

    @Override
    public boolean updateById(int id, Dish d) throws SQLException {
    	Connection conn = driver.connect();
    	PreparedStatement ps = null;
    	
    	String query = "UPDATE Dish SET dish_name=?, description=?, pic_path=?, price=?, stock=? "
    			+ "WHERE dish_id=?";
    	
    	try {
    		ps = conn.prepareStatement(query);
    		ps.setString(1, d.getDish_name());
    		ps.setString(2, d.getDescription());
    		ps.setString(3, d.getPic_path());
    		ps.setFloat(4, d.getPrice());
    		ps.setInt(5, d.getStock());
    		
    		ps.setInt(6, id);
    		return true;
			
		} catch (SQLException e) {
			logger.error("Update dish failed. ", e);
			return false;
		} finally {
			if(ps != null) {
				ps.close();
			}
		}
    }

    @Override
    public boolean deleteById(int id) throws SQLException {
        return false;
    }
}
