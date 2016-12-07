package edu.orderexp.dao;

import edu.orderexp.util.DBConnector;

/**
 * Created by Xynoci on 12/1/16.
 */
public class DaoFactory {
    public final int CUSTOMER = 0;
    public final int DISH = 1;
    public final int RESTAURANT = 2;
    public final int TRANSACTION = 3;
    private DBConnector driver = new DBConnector();

    @Deprecated
    public Dao getDao(int daoType) {
        switch (daoType) {
            case CUSTOMER:
                return new CustomerDao(driver);
            default:
                return null;
        }
    }

    public CustomerDao getCustomerDao() {
        return new CustomerDao(driver);
    }

    public RestaurantDao getRestaurantDao() {return new RestaurantDao(driver);}

    public DishDao getDishDao() {return new DishDao(driver);}
    
    public TransactionDao getTransactionDao() {return new TransactionDao(driver);}
}
