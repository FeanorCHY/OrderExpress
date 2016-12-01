package edu.orderexp.services;

import static spark.Spark.get;
import static spark.Spark.put;

import com.google.gson.Gson;

public class TransactionService {
	private Gson gson = new Gson();

	public TransactionService() {
		super();
		this.startService();
	}
	
	private void startService() {
		/* ---------------- Transaction ---------------- */
		//get all transaction 
		get("/tranaction/:cus_id", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
		//create a transaction
		put("/transaction/:cus_id", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
		//Get transaction detail
		get("/transaction/:cus_id/:tran_id", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
	}
}
