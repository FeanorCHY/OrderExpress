package edu.orderexp.services;

import com.google.gson.Gson;
import edu.orderexp.dao.RestaurantDao;
import org.apache.log4j.Logger;

/**
 * Created by Xynoci on 12/4/16.
 */
public class HomeService {
    final static Logger logger = Logger.getLogger(CustomerService.class);
    private Gson gson = new Gson();
    private RestaurantDao restaurantDao;

    public HomeService(RestaurantDao restaurantDao) {
        super();
        this.restaurantDao = restaurantDao;
    }

    public void startService() {

    }
}
