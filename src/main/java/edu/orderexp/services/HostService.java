package edu.orderexp.services;

import edu.orderexp.dao.CustomerDao;
import edu.orderexp.dao.DaoFactory;

import static spark.Spark.*;

public class HostService {

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
