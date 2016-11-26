package edu.orderexp.services;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import com.google.gson.Gson;

public class RestaurantService {
	private Gson gson;
	
	public RestaurantService() {
		super();
		this.startService();
	}
	
	private void startService() {
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
