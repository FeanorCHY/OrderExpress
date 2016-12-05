package edu.orderexp.services;

import com.google.gson.Gson;
import edu.orderexp.bean.Dish;
import edu.orderexp.dao.DishDao;
import edu.orderexp.dao.RestaurantDao;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.HashMap;

import static spark.Spark.get;

/**
 * Created by Xynoci on 12/4/16.
 */
public class SearchService {
    final static Logger logger = Logger.getLogger(CustomerService.class);
    private Gson gson = new Gson();
    private Dish dish;
    private RestaurantDao restaurantDao;
    private DishDao dishDao;

    private int id;

    public SearchService(RestaurantDao restaurantDao, DishDao dishDao) {
        super();
        this.restaurantDao = restaurantDao;
        this.dishDao = dishDao;
    }

    public void startService() {
        //get users info
        get("/search/cuisine", (request, response) -> {
            HashMap<String, Integer> typeTable = restaurantDao.fetchTypeAndSum();
            if (typeTable.size() == 0) {
                response.status(404);
            }
            return gson.toJson(typeTable);
        });

        get("/search/filter", (request, response) -> {
            HashMap<String, Object> queryParams = new HashMap<>();
            HashMap<String, Object> attributes = new HashMap<>();
            String resType = request.queryParams("res_type");
            String avgPrice = request.queryParams("avg_price");
            String resRating = request.queryParams("res_rating");
            String resDeliveryTime = request.queryParams("res_delivery_time");
            resType = resType.substring(0, resType.length() - (resType.endsWith(",") ? 1 : 0));
            queryParams.put("resType", resType);
            String[] avgPricePair = avgPrice.split(";").length == 2 ? avgPrice.split(";") : avgPrice.split(",");
            String[] resRatingPair = resRating.split(";").length == 2 ? resRating.split(";") : resRating.split(",");
            String[] resDeliveryTimePair = resDeliveryTime.split(";").length == 2 ? resDeliveryTime.split(";") : resDeliveryTime.split(",");
            queryParams.put("avgPriceFloor", avgPricePair[0]);
            queryParams.put("avgPriceCeiling", avgPricePair[1]);
            queryParams.put("resRatingFloor", resRatingPair[0]);
            queryParams.put("resRatingCeiling", resRatingPair[1]);
            queryParams.put("resDeliveryTimeFloor", resDeliveryTimePair[0]);
            queryParams.put("resDeliveryTimeCeiling", resDeliveryTimePair[1]);
            logger.info("Search - resType: " + resType + " avgPrice: " + avgPrice + " resRating: " + resRating + " resDeliveryTime: " + resDeliveryTime);
            ArrayList<HashMap<String, Object>> results = restaurantDao.fetchResInfoByTypeAndRanges(queryParams);
            attributes.put("results", results);
            return gson.toJson(attributes);
        });
    }
}
