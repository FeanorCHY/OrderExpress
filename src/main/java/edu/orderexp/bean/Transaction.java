package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 */

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;
import org.apache.commons.lang.RandomStringUtils;
import java.util.HashMap;

public class Transaction {
	
	private static final int ID_LENGTH = 6; 

	private String id;
	private String cusId;
	private java.sql.Date time;
	private BigDecimal price;
	private Map<Dish, Integer> dishes;	//Dish->Quantity
	
	public Transaction() {
		java.util.Date utilDate = new Date();
		time = new java.sql.Date(utilDate.getTime());
		
		dishes = new HashMap<Dish, Integer>();
	}

	public String getId() {
		return id;
	}

	public void setId() {
		this.id = "tran_" + 
				RandomStringUtils.randomAlphanumeric(ID_LENGTH);
	}
	
	/*
	 * Get and set customer Id
	 */
	public String getCusId() {
		return cusId;
	}

	public void setCusId(String cusId) {
		this.cusId = cusId;
	}
	
	/*
	 * Get and set current time
	 */
	public Date getTime() {
		return time;
	}

	public void setTime(java.sql.Date time) {
		this.time = time;
	}

	/*
	 * Get and set total price of transaction 
	 */
	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	/*
	 * Get and set dish & its quantity
	 */
	public Map<Dish, Integer> getDishes() {
		return dishes;
	}

	//Add dish to list
	public void addDish(Dish dish, int qty) {
		if(dishes.containsKey(dish)) {
			dishes.put(dish, dishes.get(dish)+qty);
		} else {
			dishes.put(dish, qty);
		}
	}
	
}
