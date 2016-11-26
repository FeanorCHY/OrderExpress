package edu.orderexp.services;

import static spark.Spark.*;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class CustomerService {
	
	private Gson gson = new Gson();

	public CustomerService() {
		super();
		this.startService();
	}
	
	private void startService() {
		
		
		/* ---------------- User ---------------- */
		//register 
		post("/register", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
		//login
		post("/login", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
		//get users info
		get("/user/:cus_id", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
		//update users info
		put("/user/:cus_id", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
	}
}
