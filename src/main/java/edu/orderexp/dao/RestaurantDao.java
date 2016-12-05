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
        String rearQuery = ") AND (r.res_delivery_time)>= (?) AND (r.res_delivery_time)<= (?) AND (r.res_rating)>= (?) AND (r.res_rating)<= (?) GROUP BY r.res_id HAVING (AVG(d.price))>= (?) AND (AVG(d.price))<= (?)";
        String[] typeArray = ((String) queryParams.get("resType")).split(",");
        StringBuilder stringBuilder = new StringBuilder();
        for (String ignored : typeArray) {
            stringBuilder.append("?,");
        }
        String mid = stringBuilder.deleteCharAt(stringBuilder.length() - 1).toString();
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
        return null;
    }

    @Override
    public Restaurant add(Restaurant restaurant) throws SQLException {
        Connection conn = driver.connect();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String query = "INSERT INTO Restaurant(res_name, res_password, res_address, res_phone, res_type, res_delivery_time, res_favor_times, res_rating) " + "VALUE(?, ?, ?, ?, ?, ?, ?, ?)";

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

