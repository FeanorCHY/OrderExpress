package edu.orderexp.services;

import static spark.Spark.*;

public class HostService {

	public static void main(String[] args) {
		
		port(5000);
	    //staticFileLocation("/public");

		get("/hello", (req, res) -> "Hello World");
		
		//main page
		post("/", (req, res) -> {
			return "Hello World";
		});
		
		CustomerService cs = new CustomerService();
		RestaurantService rs = new RestaurantService();
		TransactionService ts = new TransactionService();
	
	}	

}
