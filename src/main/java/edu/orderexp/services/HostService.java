package edu.orderexp.services;

import edu.orderexp.dao.DaoFactory;
import org.apache.log4j.Logger;

import static spark.Spark.*;

public class HostService {
    final static Logger logger = Logger.getLogger(HostService.class);

    public static void main(String[] args) {

        port(5000);
        staticFileLocation("/public");

        get("/hello", (req, res) -> "Hello World");

        //main page
        post("/", (req, res) -> {
            return "Hello World";
        });

        DaoFactory daoFactory = new DaoFactory();
        CustomerService customerService = new CustomerService(daoFactory.getCustomerDao());
        customerService.startService();

        DishService dishService = new DishService(daoFactory.getDishDao());
        dishService.startService();

        RestaurantService restaurantService = new RestaurantService(daoFactory.getRestaurantDao());
        restaurantService.startService();

        SearchService searchService = new SearchService(daoFactory.getRestaurantDao(), daoFactory.getDishDao());
        searchService.startService();

        TransactionService transactionService = new TransactionService(daoFactory.getTransactionDao());
        transactionService.startService();

        HomeService homeService = new HomeService(daoFactory.getRestaurantDao());
        homeService.startService();

    }

}
