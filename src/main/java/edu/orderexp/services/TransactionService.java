package edu.orderexp.services;

import static spark.Spark.get;
import static spark.Spark.put;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import edu.orderexp.bean.Dish;
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
		
		//get all transaction 
		get("/tranaction/:cus_id", (request, response) -> {
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
		
		//create a transaction
		put("/transaction/:cus_id", (req, res) -> {
			return "Hello: " + req.params(":id");
		});
		
		//Get transaction detail
		get("/transaction/:cus_id/:tran_id", (request, response) -> {
			HashMap<String, Object> attributes = new HashMap<>();
			Session session = request.session(true);
			
			//get transactions		
			List<Transaction> transactions = session.attribute("transactions");
			
			int tran_id = Integer.parseInt(request.params("tran_id"));
			//int cus_id = Integer.parseInt(request.params("cus_id"));
			
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
	}
}
