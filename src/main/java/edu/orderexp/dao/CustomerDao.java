package edu.orderexp.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import edu.orderexp.bean.Customer;
import edu.orderexp.util.DBConnector;


public class CustomerDao implements Dao<Customer> {
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
        return null;
    }

    @Override
    public Customer add(Customer c) throws SQLException {
        Connection conn = driver.connect();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String query = "INSERT INTO Customer(cus_name, cus_password, cus_gender, cus_age, cus_email, cus_address, cus_phone) " +
                "VALUE(?, ?, ?, ?, ?, ?, ?)";

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
                System.out.println("user \"" + c.getCus_name() + "\" added, id = " + c.getCus_id() + ". ");
                return c;
            } else {
                return null;
            }
        } catch (SQLException e) {
            System.out.println("Customer insertion failed!!!");
            e.printStackTrace();
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
                flag = existByEmail(customer.getCus_email());
                System.out.println(flag ? "rejected: email taken." : "passed: valid email.");
            }
        } catch (SQLException e) {
            System.out.println("User existence validation.");
            e.printStackTrace();
        }
        return flag;
    }

    @Override
    public boolean updateById(int id) throws SQLException {
        return false;
    }

    @Override
    public boolean deleteById(int id) throws SQLException {
        return false;
    }

    public void authenticate(String userEmail, String password) {
        Connection conn = driver.connect();
        CallableStatement callstatement = null;
        try {
            callstatement = conn.prepareCall("CALL login(?,?,?);");
            callstatement.setString(1, "siz16@pitt.edu");
            callstatement.setString(2, "12345567");
            callstatement.registerOutParameter(3, Types.INTEGER);
            callstatement.execute();
            System.out.println(callstatement.getInt(3));
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (callstatement != null) {
                try {
                    callstatement.close();
                } catch (SQLException e) {
                    System.out.println("Authenticate callable statement failed to close! ");
                }
            }
        }
    }

    /**
     * @return the email exists or not
     */
    private boolean existByEmail(String email) throws SQLException {
        Connection conn = driver.connect();
        int count = 0;
        ResultSet rs = fetchElementByEmail(conn, email);
        while (rs.next()) {
            count++;
        }
        conn.close();
        return count != 0;
    }

    /**
     * Get customer by email
     *
     * @return Customer
     */
    public ResultSet fetchElementByEmail(Connection conn, String email) throws SQLException {
        String query = "SELECT * FROM Customer WHERE cus_email = ?";
        PreparedStatement ps = conn.prepareStatement(query);
        ps.setString(1, email);
        return ps.executeQuery();
//        System.out.println("We can't get this customer by email! ");
//        e.printStackTrace();
//        return null;
    }

}
