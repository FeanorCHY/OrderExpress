package edu.orderexp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import edu.orderexp.bean.Restaurant;
import edu.orderexp.util.DBConnector;

public class RestaurantDao implements Dao<Restaurant> {
    String query = "";
    private DBConnector driver;

    public RestaurantDao(DBConnector driver) {
        this.driver = driver;
        System.out.println("----------- RestaurantDao Connection -----------");
    }

    /**
     * Insert record to TABLE restaurant
     *
     * @return automate generated restaurant_id
     */
    public int insertRestaurant(String name, String password, String address, String phone,
                                String type, int deliveryTime, int favTimes) throws SQLException {
        Connection connection = driver.connect();
        query = "INSERT INTO OrderExpress.Customer(res_name, res_password, res_address, res_phone, res_type, res_delivery_time, res_favor_times)" +
                "VALUE(?, ?, ?, ?, ?, ?, ?)";

        try {
            PreparedStatement ps = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, name);
            ps.setString(2, password);
            ps.setString(3, address);
            ps.setString(4, phone);
            ps.setString(5, type);
            ps.setInt(6, deliveryTime);
            ps.setInt(7, favTimes);

            ps.executeUpdate();

            ResultSet rs = ps.getGeneratedKeys();

            if (rs.next()) {
                int autoKey = rs.getInt(1);
                return autoKey;
            } else {
                return -1;
            }

        } catch (SQLException e) {
            System.out.println("Restaurant insertion failed!!!");
            e.printStackTrace();
            return -1;
        }
        finally {
            connection.close();
        }
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
        return null;
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

