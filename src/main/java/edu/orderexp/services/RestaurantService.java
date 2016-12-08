package edu.orderexp.services;

import com.google.gson.Gson;

import edu.orderexp.bean.Dish;
import edu.orderexp.bean.Restaurant;
import edu.orderexp.dao.DishDao;
import edu.orderexp.dao.RestaurantDao;
import spark.Session;

import org.apache.log4j.Logger;

import static edu.orderexp.util.JsonTransformer.fromJson;
import static spark.Spark.*;

import java.util.HashMap;

public class RestaurantService {
    final static Logger logger = Logger.getLogger(RestaurantService.class);
    private Restaurant restaurant;
    private RestaurantDao rd;
    private Dish dish;
    private DishDao dd;
    private Gson gson;

    public RestaurantService(RestaurantDao restaurantDao) {
        super();
        this.rd = restaurantDao;
    }

    public void startService() {
        /* ---------------- Restaurant ---------------- */
    	// register
        post("/restaurant/register", (request, response) -> {
            // http://stackoverflow.com/questions/17742633/how-read-data-sent-by-client-with-spark
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);
            restaurant = fromJson(request.body(), Restaurant.class);

            if (rd.exist(restaurant)) {
                // http://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
                response.status(409);
                attributes.put("statusMsg", "Email has already been taken. Use other ones please.");
            } else {
                restaurant = rd.add(restaurant);
                attributes.put("restaurant", restaurant);
                attributes.put("statusMsg", "Registration succeeded. Redirecting page...");
                // log in
                restaurant.setRes_password(""); // exclude password
                session.attribute("restaurant", restaurant);
                logger.info(restaurant.getRes_email() + " login at registration.");
            }
            return gson.toJson(attributes);
        });

        //login
        post("restaurant/login", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);
            restaurant = fromJson(request.body(), Restaurant.class);

            if (rd.exist(restaurant)) {
                restaurant = rd.authenticate(restaurant);
                if (restaurant != null) {
                    session.attribute("restaurant", restaurant);
                    attributes.put("restaurant", restaurant);
                    attributes.put("statusMsg", "Log in success.");
                    logger.info(restaurant.getRes_email() + " login.");
                } else {
                    response.status(422); // HTTP 422 (Unprocessable Entity)
                    attributes.put("statusMsg", "Password not match.");
                }
            } else {
                response.status(404);
                attributes.put("statusMsg", "Unregistered.");
            }
            return gson.toJson(attributes);
        });
        
    	//get restaurant info
        get("/restaurant/:res_id", (request, response) -> {
			HashMap<String, Object> attributes = new HashMap<>();
			Session session = request.session(true);
			
			int res_id = Integer.parseInt(request.params("res_id"));
			restaurant = rd.fetchElementById(res_id);
			
			if(restaurant != null) {
        		session.attribute("restaurant", restaurant);
        		attributes.put("restaurant", restaurant);
        		attributes.put("statusMsg", "Restaurant exists. ");
        		logger.info(restaurant.getRes_email() + " exists. ");
        	} else {
        		response.status(404); //not found
        		attributes.put("statusMsg", "Restaurant inexisted. ");
        	}
			
            return gson.toJson(attributes);
        });
        
        //update restaurant info
        put("/restaurant/:res_id", (request, response) -> {
        	HashMap<String, Object> attributes = new HashMap<>();
        	Session session = request.session(true);
        	// http://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request
            restaurant = fromJson(request.body(), Restaurant.class);
            int res_id = Integer.parseInt(request.params(":res_id"));
        	boolean updateSuccess = rd.updateById(res_id, restaurant);

            if(updateSuccess) {
            	session.attribute("restaurant", restaurant);
            	attributes.put("restaurant", restaurant);
            	attributes.put("statusMsg", "Profile update succeed.");
            	logger.info(restaurant.getRes_email() + " update profile.");
            } else {
            	response.status(403); //forbidden
            	attributes.put("statusMsg", "Update failed.");
            }
            
            return gson.toJson(attributes);
        });

        //add new dish
        post("/restaurant/:res_id/dish", (request, response) -> {
        	HashMap<String, Object> attributes = new HashMap<>();
            //Session session = request.session(true);
            
            dish = fromJson(request.body(), Dish.class);
            dish = dd.add(dish);
            
            if(dish != null) {
            	attributes.put("dish", dish);
            	attributes.put("statusMsg", "New dish add succeed. ");
            	logger.info("Restaurant" + dish.getRest_id() + 
            			" add a new dish \"" + dish.getDish_name() + "\" successfully. ");
            } else {
            	response.status(500); //no resource created
            	attributes.put("statusMsg", "Add new dish failed. ");
            }
            
        	return gson.toJson(attributes);
        });

        //update dish details
        put("/restaurant/:res_id/:dish_id", (request, response) -> {
        	HashMap<String, Object> attributes = new HashMap<>();
        	int dish_id = Integer.parseInt(request.params("dish_id"));
        	dish = fromJson(request.body(), Dish.class);
        	
        	boolean updateSuccess = dd.updateById(dish_id, dish);
        	if(updateSuccess) {
        		attributes.put("dish", dish);
        		attributes.put("statusMsg", "Dish update succeed. ");
        		logger.info("Dish \"" + dish.getDish_name() + "\" has been updated successfully. ");
        	} else {
        		response.status(403); //forbidden
            	attributes.put("statusMsg", "Update failed.");
        	}
            
        	return gson.toJson(attributes);
        });

        //delete dish
        delete("/restaurant/:res_id/:dish_id", (req, res) -> {
            return "Hello: " + req.params(":id");
        });
    }
}
