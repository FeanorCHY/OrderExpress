package edu.orderexp.services;

import static spark.Spark.*;

import java.sql.CallableStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;

import org.eclipse.jetty.http.MetaData.Request;
import org.eclipse.jetty.server.session.JDBCSessionManager.Session;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import edu.orderexp.bean.Customer;

public class CustomerService {
	
	private Gson gson = new Gson();	
	Customer customer = new Customer();
	
	private int id;
	
	public CustomerService() {
		super();
		this.startService();
	}
	
	private void startService() {
		/* ---------------- User ---------------- */
		//register 
		post("/register", (req, res) -> {
			HashMap<String, Object> attributes = new HashMap<>();
			String cusName = req.params("cus_name");
			String cusPassword = req.params("cus_password");
			String cusGender = req.params("cus_gender");
			int cusAge = Integer.parseInt(req.params("cus_age"));
			String cusEmail = req.params("cus_email");
			String cusAddress = req.params("cus_address");
			String cusPhone = req.params("cus_phone");
			
			attributes.put("cus_name", cusName);
			attributes.put("cus_password", cusPassword);
			attributes.put("cus_gender", cusGender);
			attributes.put("cus_age", cusAge);
			attributes.put("cus_email", cusEmail);
			attributes.put("cus_address", cusAddress);
			attributes.put("cus_phone", cusPhone);
			
			try {
				int tmp = customer.addCustomer(cusName, cusPassword, cusGender, cusAge, 
						cusEmail, cusAddress, cusPhone);
				if(tmp != -1) {
					id = tmp;
					System.out.println("CustomerID: " + id);
					
					//session session = req.session(true);
					//session.attribute("customer", customer);
				}
				
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				attributes.put("status", "Server error. Please try again!");
			}
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
			String cus_id = req.params(":cus_id");
			
			return "Hello: " + req.params(":id");
		});
		
	}
	

}
