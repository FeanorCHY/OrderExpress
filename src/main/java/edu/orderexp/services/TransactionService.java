package edu.orderexp.services;

import static spark.Spark.get;
import static spark.Spark.post;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

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
			//Session session = request.session(true);
			
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
			//Session session = request.session(true);
			
			List<Map<String, Object>> details = td.fetchDetailbyTranId(tran_id);
			
			if(details != null) {
				attributes.put("statusMsg", "Transaction details are fetched. ");
				
				JsonArray trans_detail = new JsonArray();
				for(Map<String, Object> d:details) {
					JsonObject metaObject = new JsonObject();
					metaObject.addProperty("res_id", (int)d.get("res_id"));
					metaObject.addProperty("res_name", d.get("res_name").toString());
					metaObject.addProperty("dish_id", (int)d.get("dish_id"));
					metaObject.addProperty("dish_name", d.get("dish_name").toString());
					metaObject.addProperty("price", (float)d.get("price"));
					metaObject.addProperty("pic_path", d.get("pit_path").toString());
					metaObject.addProperty("quantity", (int)d.get("quantity"));
					
					trans_detail.add(metaObject);
				}
				
				attributes.put("trans_detail", trans_detail);
			} else {
				response.status(204); //no content
				attributes.put("statusMsg", "No transaction details. ");
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
