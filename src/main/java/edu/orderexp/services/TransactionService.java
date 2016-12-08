package edu.orderexp.services;

import static spark.Spark.get;
import static spark.Spark.put;
import static spark.Spark.post;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import edu.orderexp.bean.Dish;
import edu.orderexp.bean.Restaurant;
import edu.orderexp.bean.Transaction;
import edu.orderexp.dao.TransactionDao;
import spark.Session;

public class TransactionService {
	final static Logger logger = Logger.getLogger(CustomerService.class);
	private Gson gson = new Gson();
	
	Transaction transaction = new Transaction();
	TransactionDao td;
	
	public TransactionService(TransactionDao td) {
		super();
		this.td = td;
	}
	
	public void startService() {
				
		//post a transaction
		post("/transaction/", (request, response) -> {
			String transactionJson = request.body();
			
			JsonObject jsonObject = new JsonParser().parse(transactionJson).getAsJsonObject();
			
			return "Hello: " + request.params(":id");
		});
		
		//get all transaction for user
		get("/tranaction/user/:cus_id", (request, response) -> {
			HashMap<String, Object> attributes = new HashMap<>();
			Session session = request.session(true);
			
			int cus_id = Integer.parseInt(request.params("cus_id"));
			List<Transaction> transactions = td.fetchAllbyCusId(cus_id);
			
			if(transactions != null) {
				attributes.put("statusMsg", "Transactions fetched successfully");
				
				JsonArray trans_list = new JsonArray();
				for(Transaction t : transactions) {
					JsonObject metaObject = new JsonObject();
					metaObject.addProperty("tran_id", t.getId());
					metaObject.addProperty("total_price",t.getPrice());
					metaObject.addProperty("tran_date", t.getPrice());
					
					JsonArray res_list = new JsonArray();
					for(Restaurant r : t.getRestaurants()) {
						JsonObject resObject = new JsonObject();
						resObject.addProperty("res_id", r.getRes_id());
						resObject.addProperty("res_name", r.getRes_name());
						
						res_list.add(resObject);
					}
					
					metaObject.add("res_list", res_list);
					
					trans_list.add(metaObject);
				}
				
				attributes.put("trans_list", trans_list);
				logger.info("Customer" + cus_id + " 's transactions are fetched. ");
			} else {
				response.status(204); //No Content
				attributes.put("statusMsg", "No transaction found. ");
			}
			
			return gson.toJson(attributes);
		});
		
		//Get transaction detail for user
		get("/transaction/:tran_id", (request, response) -> {
			HashMap<String, Object> attributes = new HashMap<>();
			int tran_id = Integer.parseInt(request.params("tran_id"));
			Session session = request.session(true);
	
			if(transactions != null) {
				Map<Dish, Integer> dishes = null;
				
				for(Transaction t:transactions) {
					if(t.getId() == tran_id) {
						dishes = t.getDishes();
						break;
					}
				}
				
				if(dishes != null) {
					session.attribute("dishes", dishes);
					attributes.put("dishes", dishes);
					attributes.put("statusMsg", "Dishes retrieved successfully. ");
					logger.info("Dishes in transaction" + tran_id + " are retrieved");
				} else {
					response.status(204); //no content
					attributes.put("statusMsg", "Empty Transaction. ");
				}			
			} else {
				response.status(401); //session expired
				attributes.put("statusMsg", "Transactions session has expired. ");
			}
			
			return gson.toJson(attributes);
		});	
		
		//get all transaction for restaurant
		get("/tranaction/restaurant/:cus_id", (request, response) -> {
			HashMap<String, Object> attributes = new HashMap<>();
			Session session = request.session(true);
			
			int cus_id = Integer.parseInt(request.params("cus_id"));
			List<Transaction> transactions = td.fetchAllbyCusId(cus_id);
			
			if(transactions != null) {
				//do I need to add customer to the session
				session.attribute("transactions", transactions);
				attributes.put("transactions", transactions);
				attributes.put("statusMsg", "Transactions fetched successfully");
				logger.info("Customer" + cus_id + " 's transactions are fetched. ");
			} else {
				response.status(204); //No Content
				attributes.put("statusMsg", "No transaction found. ");
			}
			
			return gson.toJson(attributes);
		});
		
		//Get transaction detail for restaurant
		get("/transaction/:tran_id/:res_id", (request, response) -> {
			HashMap<String, Object> attributes = new HashMap<>();
			return gson.toJson(attributes);
		});
	}
}
