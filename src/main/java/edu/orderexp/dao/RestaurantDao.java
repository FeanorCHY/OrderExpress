package edu.orderexp.dao;

import edu.orderexp.bean.Restaurant;
import edu.orderexp.util.DBConnector;
import org.apache.log4j.Logger;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class RestaurantDao implements Dao<Restaurant> {
    final static Logger logger = Logger.getLogger(RestaurantDao.class);
    private DBConnector driver;

    public RestaurantDao(DBConnector driver) {
        this.driver = driver;
    }

    public HashMap<String, Integer> fetchTypeAndSum() {
        HashMap<String, Integer> typeTable = new HashMap<>();
        Connection conn = driver.connect();
        Statement stmt = null;
        ResultSet rs = null;
        String query = "SELECT res_type, COUNT(*) AS type_sum FROM Restaurant GROUP BY res_type ORDER BY type_sum DESC";
        try {
            stmt = conn.createStatement();
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                typeTable.put(rs.getString(1), rs.getInt(2));
            }
        } catch (SQLException e) {
            logger.error(e);
        } finally {
            try {
                if (stmt != null) {
                    conn.close();
                }
            } catch (SQLException se) {
                logger.error(se);
            }
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException se) {
                logger.error(se);
            }
        }
        return typeTable;
    }

    public ArrayList<HashMap<String, Object>> fetchResInfoByTypeAndRanges(HashMap<String, Object> queryParams) {
        ArrayList<HashMap<String, Object>> resultArray = new ArrayList<>();
        Connection conn = driver.connect();
        PreparedStatement ps = null;
        ResultSet rs = null;
        /**
         * http://stackoverflow.com/questions/178479/preparedstatement-in-clause-alternatives
         * http://stackoverflow.com/questions/17842211/how-to-use-an-arraylist-as-a-prepared-statement-parameter
         * http://www.javaranch.com/journal/200510/Journal200510.jsp#a2
         * http://stackoverflow.com/questions/3107044/preparedstatement-with-list-of-parameters-in-a-in-clause
         */
        String foreQuery = "SELECT r.res_id AS res_id, r.res_name AS res_name, r.res_type AS res_type, r.res_delivery_time AS res_delivery_time, r.res_favor_times AS res_favor_time, r.res_rating AS res_rating, AVG(d.price) AS avg_price FROM OrderExpress.Restaurant r, OrderExpress.dish d WHERE (d.rest_id)=(r.res_id) AND (r.res_type) IN (";
        String rearQuery = ") AND (r.res_delivery_time)>= (?) AND (r.res_delivery_time)<= (?) AND (r.res_rating)>= (?) AND (r.res_rating)<= (?) AND r.res_name LIKE (?) ESCAPE '!' GROUP BY r.res_id HAVING (AVG(d.price))>= (?) AND (AVG(d.price))<= (?)";
        String[] typeArray = ((String) queryParams.get("resType")).split(",");
        StringBuilder stringBuilder = new StringBuilder();
        for (String ignored : typeArray) {
            stringBuilder.append("?,");
        }
        String mid = stringBuilder.deleteCharAt(stringBuilder.length() - 1).toString();
        String searchText = String.valueOf(queryParams.get("searchText")).replace("!", "!!").replace("%", "!%").replace("_", "!_").replace("[", "![");
        try {
            ps = conn.prepareStatement(foreQuery + mid + rearQuery);
            int i = 1;
            for (; i <= typeArray.length; i++) {
                ps.setString(i, typeArray[i - 1]);
            }
            ps.setInt(i++, Integer.parseInt(String.valueOf(queryParams.get("resDeliveryTimeFloor"))));
            ps.setInt(i++, Integer.parseInt(String.valueOf(queryParams.get("resDeliveryTimeCeiling"))));
            ps.setInt(i++, Integer.parseInt(String.valueOf(queryParams.get("resRatingFloor"))));
            ps.setInt(i++, Integer.parseInt(String.valueOf(queryParams.get("resRatingCeiling"))));
            ps.setString(i++, "%" + searchText + "%");
            ps.setInt(i++, Integer.parseInt(String.valueOf(queryParams.get("avgPriceFloor"))));
            ps.setInt(i, Integer.parseInt(String.valueOf(queryParams.get("avgPriceCeiling"))));
            rs = ps.executeQuery();
            while (rs.next()) {
                HashMap<String, Object> tempResult = new HashMap<>();
                tempResult.put("res_id", rs.getInt(1));
                tempResult.put("res_name", rs.getString(2));
                tempResult.put("res_type", rs.getString(3));
                tempResult.put("res_delivery_time", rs.getInt(4));
                tempResult.put("res_favor_times", rs.getInt(5));
                tempResult.put("res_rating", rs.getInt(6));
                tempResult.put("res_avg_price", rs.getFloat(7));
                resultArray.add(tempResult);
            }
            return resultArray;
        } catch (SQLException e) {
            logger.error(e);
        }
        return null;
    }

    @Override
    public List<Restaurant> fetchAll() {
        return null;
    }

    @Override
    public Restaurant fetchElementById(int id) {
    	Connection conn = driver.connect();

        ArrayList<Restaurant> restaurants = new ArrayList<>();
        String query = "SELECT * FROM Restaurant WHERE res_id = ?";

        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                restaurants.add(fromResultSet(rs));
            }

        } catch (SQLException e) {
            logger.error("Fetch customer from id failed! ");
            return null;
        }

        return restaurants.size() == 1 ? restaurants.get(0) : null;
    }


    @Override
    public Restaurant add(Restaurant restaurant) throws SQLException {
        Connection conn = driver.connect();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String query = "INSERT INTO Restaurant(res_name, res_password, res_address, res_phone, res_type, res_delivery_time, res_favor_times, res_rating, res_email) " 
        		+ "VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            ps = conn.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, restaurant.getRes_name());
            ps.setString(2, restaurant.getRes_password());
            ps.setString(3, restaurant.getRes_address());
            ps.setString(4, restaurant.getRes_phone());
            ps.setString(5, restaurant.getRes_type());
            ps.setInt(6, restaurant.getRes_delivery_time());
            ps.setInt(7, restaurant.getRes_favor_times());
            ps.setInt(8, restaurant.getRes_rating());
            ps.setString(9,  restaurant.getRes_email());
            
            ps.executeUpdate();
            rs = ps.getGeneratedKeys();
            if (rs.next()) {
                restaurant.setRes_id(rs.getInt(1));
                logger.info("Restaurant \"" + restaurant.getRes_name() + "\" added, id = " + restaurant.getRes_id() + ". ");
                return restaurant;
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("Restaurant insertion failed.", e);
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
    public boolean exist(Restaurant restaurant) {
    	boolean flag = false;
        try {
            if (!restaurant.getRes_email().equals("")) {
                flag = emailExist(restaurant.getRes_email());
                logger.info(flag ? "email exists." : "unregistered email.");
            }
        } catch (SQLException e) {
            logger.error("Restaurant existence validation.", e);
        }
        return flag;
    }
    
    /**
     * @return the email exists or not
     */
    private boolean emailExist(String email) throws SQLException {
        Connection conn = driver.connect();
        Restaurant restaurant = fetchElementByEmail(conn, email);
        conn.close();
        return restaurant != null;
    }
    
    //fetch restaurant by email
    public Restaurant fetchElementByEmail(Connection conn, String email) throws SQLException {
    	ArrayList<Restaurant> resList = new ArrayList<>();
    	String query = "SELECT * FROM Restaurant WHERE res_email = ?";
    	PreparedStatement ps = conn.prepareStatement(query);
    	ps.setString(1, email);
    	
    	ResultSet rs = ps.executeQuery();
    	
    	while(rs.next()) {
    		resList.add(fromResultSet(rs));
    	}
    	return resList.size() == 1? resList.get(0) : null;
    }
    
    //get restaurant from result set
    private Restaurant fromResultSet(ResultSet rs) throws SQLException {
    	Restaurant restaurant = new Restaurant();
    	restaurant.setRes_id(rs.getInt(1));
    	restaurant.setRes_name(rs.getString(2));
    	restaurant.setRes_password(rs.getString(3));
    	restaurant.setRes_address(rs.getString(4));
    	restaurant.setRes_phone(rs.getString(5));
    	restaurant.setRes_type(rs.getString(6));
    	restaurant.setRes_delivery_time(rs.getInt(7));
    	restaurant.setRes_favor_times(rs.getInt(8));
    	restaurant.setRes_rating(rs.getShort(9));
    	restaurant.setRes_email(rs.getString(10));
    	
    	return restaurant;
    }
    
    public Restaurant authenticate(Restaurant res) throws SQLException {
        ArrayList<Restaurant> restaurants = new ArrayList<>();
        Connection conn = driver.connect();
        String query = "SELECT * FROM Restaurant WHERE res_email = ? AND res_email = ?";
        PreparedStatement ps = conn.prepareStatement(query);
        ps.setString(1, res.getRes_email());
        ps.setString(2, res.getRes_password());
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            restaurants.add(fromResultSet(rs));
        }
        return restaurants.size() == 1 ? restaurants.get(0) : null;
    }
    
    @Override
    public boolean updateById(int id, Restaurant r) throws SQLException {
        Connection conn = driver.connect();
        PreparedStatement ps = null;
        String foreQuery = "UPDATE Restaurant SET res_name=?,res_email=?, res_address=?, "
        		+ "res_phone=?, res_type=?, res_delivery_time=?, res_favor_times=?";
        String password = ", cus_password=?";
        String rearQuery = " WHERE res_id=?";
        String query;
        boolean hasPassword = !r.getRes_password().equals("");
        if (hasPassword) {
            query = foreQuery + password + rearQuery;
        } else {
            query = foreQuery + rearQuery;
        }
        try {
            ps = conn.prepareStatement(query);
            ps.setString(1, r.getRes_name());
            ps.setString(2, r.getRes_email());
            ps.setString(3, r.getRes_address());
            ps.setString(4, r.getRes_phone());
            ps.setString(5, r.getRes_type());
            ps.setInt(6, r.getRes_delivery_time());
            ps.setInt(7, r.getRes_favor_times());
            
            if (hasPassword) {
                ps.setString(8, r.getRes_password());
            }
            ps.setInt(hasPassword ? 9 : 8, id);
            ps.executeUpdate();
            
            return true;
        } catch (SQLException e) {
            logger.error("Update restaurant failed!", e);
            return false;
        } finally {
            if (ps != null) {
                ps.close();
            }
        }

    }

    @Override
    public boolean deleteById(int id) throws SQLException {
        return false;
    }
}

