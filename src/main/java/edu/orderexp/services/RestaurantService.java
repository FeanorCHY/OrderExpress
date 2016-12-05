package edu.orderexp.services;

import com.google.gson.Gson;
import edu.orderexp.dao.DishDao;
import edu.orderexp.dao.RestaurantDao;
import org.apache.log4j.Logger;

import static spark.Spark.*;

public class RestaurantService {
    final static Logger logger = Logger.getLogger(RestaurantService.class);
    private RestaurantDao restaurantDao;
    private Gson gson;

    public RestaurantService(RestaurantDao restaurantDao) {
        super();
        this.restaurantDao = restaurantDao;
    }

    public void startService() {
        /* ---------------- Restaurant ---------------- */
        //get dish lists
        get("/restaurant/:res_id", (req, res) -> {
            return "Hello: " + req.params(":id");
        });

        //add dish
        post("/restaurant/:res_id/:dish_id", (req, res) -> {
            return "Hello: " + req.params(":id");
        });

        //edit dish details
        put("/restaurant/:res_id/:dish_id", (req, res) -> {
            return "Hello: " + req.params(":id");
        });

        //delete dish
        delete("/restaurant/:res_id/:dish_id", (req, res) -> {
            return "Hello: " + req.params(":id");
        });
    }
}
