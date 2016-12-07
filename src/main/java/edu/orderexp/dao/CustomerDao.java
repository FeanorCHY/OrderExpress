package edu.orderexp.dao;

import edu.orderexp.bean.Customer;
import edu.orderexp.util.DBConnector;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class CustomerDao implements Dao<Customer> {
    final static Logger logger = Logger.getLogger(CustomerDao.class);
    private DBConnector driver;

    public CustomerDao(DBConnector driver) {
        this.driver = driver;
    }

    @Override
    public List<Customer> fetchAll() {
        return null;
    }

    @Override
    public Customer fetchElementById(int id) {
        Connection conn = driver.connect();

        ArrayList<Customer> customers = new ArrayList<>();
        String query = "SELECT * FROM Customer WHERE cus_id = ?";

        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                customers.add(fromResultSet(rs));
            }

        } catch (SQLException e) {
            logger.error("Fetch customer from id failed! ");
            return null;
        }

        return customers.size() == 1 ? customers.get(0) : null;
    }

    @Override
    public Customer add(Customer c) throws SQLException {
        Connection conn = driver.connect();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String query = "INSERT INTO Customer(cus_name, cus_password, cus_gender, cus_age, cus_email, cus_address, cus_phone) " + "VALUE(?, ?, ?, ?, ?, ?, ?)";

        try {
            ps = conn.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
            ps.setString(1, c.getCus_name());
            ps.setString(2, c.getCus_password());
            ps.setString(3, c.getCus_gender());
            ps.setInt(4, c.getCus_age());
            ps.setString(5, c.getCus_email());
            ps.setString(6, c.getCus_address());
            ps.setString(7, c.getCus_phone());
            ps.executeUpdate();
            rs = ps.getGeneratedKeys();
            if (rs.next()) {
                c.setCus_id(rs.getInt(1));
                logger.info("Customer \"" + c.getCus_name() + "\" added, id = " + c.getCus_id() + ". ");
                return c;
            } else {
                return null;
            }
        } catch (SQLException e) {
            logger.error("Customer insertion failed.", e);
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
    public boolean exist(Customer customer) {
        boolean flag = false;
        try {
            if (!customer.getCus_email().equals("")) {
                flag = emailExist(customer.getCus_email());
                logger.info(flag ? "email exists." : "unregistered email.");
            }
        } catch (SQLException e) {
            logger.error("Customer existence validation.", e);
        }
        return flag;
    }

    @Override
    public boolean updateById(int cus_id, Customer c) throws SQLException {
        Connection conn = driver.connect();
        PreparedStatement ps = null;
        String foreQuery = "UPDATE Customer SET cus_name=?,cus_gender=?, cus_age=?, cus_email=?, cus_address=?, cus_phone=?";
        String password = ", cus_password=?";
        String rearQuery = " WHERE cus_id=?";
        String query;
        boolean hasPassword = !c.getCus_password().equals("");
        if (hasPassword) {
            query = foreQuery + password + rearQuery;
        } else {
            query = foreQuery + rearQuery;
        }
        try {
            ps = conn.prepareStatement(query);
            ps.setString(1, c.getCus_name());
            ps.setString(2, c.getCus_gender());
            ps.setInt(3, c.getCus_age());
            ps.setString(4, c.getCus_email());
            ps.setString(5, c.getCus_address());
            ps.setString(6, c.getCus_phone());
            if (hasPassword) {
                ps.setString(7, c.getCus_password());
            }
            ps.setInt(hasPassword ? 8 : 7, cus_id);
            ps.executeUpdate();

        } catch (SQLException e) {
            logger.error("Update customer failed!", e);
            return false;
        } finally {
            if (ps != null) {
                ps.close();
            }
        }
        return true;
    }

    @Override
    public boolean deleteById(int id) throws SQLException {
        return false;
    }

    public Customer authenticate(Customer customer) throws SQLException {
        ArrayList<Customer> customers = new ArrayList<>();
        Connection conn = driver.connect();
        String query = "SELECT * FROM Customer WHERE cus_email = ? AND cus_password = ?";
        PreparedStatement ps = conn.prepareStatement(query);
        ps.setString(1, customer.getCus_email());
        ps.setString(2, customer.getCus_password());
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            customers.add(fromResultSet(rs));
        }
        return customers.size() == 1 ? customers.get(0) : null;
    }

    /**
     * @return the email exists or not
     */
    private boolean emailExist(String email) throws SQLException {
        Connection conn = driver.connect();
        Customer customer = fetchElementByEmail(conn, email);
        conn.close();
        return customer != null;
    }

    /**
     * Get customer by email
     *
     * @return Customer
     */
    public Customer fetchElementByEmail(Connection conn, String email) throws SQLException {
        ArrayList<Customer> customers = new ArrayList<>();
        String query = "SELECT * FROM Customer WHERE cus_email = ?";
        PreparedStatement ps = conn.prepareStatement(query);
        ps.setString(1, email);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            customers.add(fromResultSet(rs));
        }
        return customers.size() == 1 ? customers.get(0) : null;
    }

    private Customer fromResultSet(ResultSet rs) throws SQLException {
        Customer customer = new Customer();
        customer.setCus_id(rs.getInt(1));
        customer.setCus_name(rs.getString(2));
        customer.setCus_password(rs.getString(3));
        customer.setCus_gender(rs.getString(4));
        customer.setCus_age(rs.getInt(5));
        customer.setCus_email(rs.getString(6));
        customer.setCus_address(rs.getString(7));
        customer.setCus_phone(rs.getString(8));
        return customer;
    }

}
