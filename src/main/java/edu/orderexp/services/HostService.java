package edu.orderexp.services;

import org.apache.log4j.Logger;

import edu.orderexp.dao.CustomerDao;
import edu.orderexp.dao.DaoFactory;

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
        DaoFactory df = new DaoFactory();
		CustomerService cs = new CustomerService(df.getCustomerDao());
		RestaurantService rs = new RestaurantService();
		TransactionService ts = new TransactionService();
	
	}	

}
