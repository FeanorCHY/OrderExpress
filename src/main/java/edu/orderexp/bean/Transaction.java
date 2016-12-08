package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 */

import java.sql.Date;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Transaction {

	private int id;
	private int cusId;
	private Date time;
	private float price;
	private List<Restaurant> restaurants;
	private Map<Dish, Integer> dishes;	//Dish->Quantity
	
	public Transaction() {
		dishes = new HashMap<Dish, Integer>();
	}
	
	public Transaction(int id) {
		this.id = id;
		dishes = new HashMap<>();
		restaurants = new ArrayList<>();
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

	public void setTime() {
		this.time = new Date(System.currentTimeMillis());
	}
	
	public void setTime(Date date) {
		this.time = date;
	}

	/*
	 * Get and set total price of transaction 
	 */
	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
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
	
	public List<Restaurant> getRestaurants() {
		return restaurants;
	}
	
	public void addRestaurant(int res_id, String res_name) {
		boolean exist = false;
		
		for(Restaurant r:restaurants) {
			if(r.getRes_id() == res_id) {
				exist = true;
				break;
			}
		}
		
		if(!exist) {
			Restaurant newR	 = new Restaurant();
			newR.setRes_id(res_id);
			newR.setRes_name(res_name);
			
			restaurants.add(newR);
		}
	}
	
}
