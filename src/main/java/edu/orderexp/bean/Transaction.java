package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 */

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Map;
import java.util.HashMap;

public class Transaction {

	private int id;
	private int cusId;
	private Date time;
	private BigDecimal price;
	private Map<Dish, Integer> dishes;	//Dish->Quantity
	
	public Transaction() {
		time = new Date(System.currentTimeMillis());
		dishes = new HashMap<Dish, Integer>();
	}
	
	public Transaction(int id) {
		this.id = id;
		dishes = new HashMap<>();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	/*
	 * Get and set customer Id
	 */
	public int getCusId() {
		return cusId;
	}

	public void setCusId(int cusId) {
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
