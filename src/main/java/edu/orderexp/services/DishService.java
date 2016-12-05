package edu.orderexp.services;

import com.google.gson.Gson;
import edu.orderexp.bean.Dish;
import edu.orderexp.dao.DishDao;
import org.apache.log4j.Logger;

import static spark.Spark.get;

/**
 * Created by Xynoci on 12/4/16.
 */
public class DishService {
    final static Logger logger = Logger.getLogger(CustomerService.class);
    private Gson gson = new Gson();
    private Dish dish;
    private DishDao dishDao;

    private int id;

    public DishService(DishDao dishDao) {
        super();
        this.dishDao = dishDao;
    }

    public void startService() {

    }
}
