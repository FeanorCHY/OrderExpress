package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 */

import org.apache.commons.lang.RandomStringUtils;

import java.util.List;
import java.util.ArrayList;

public class Restaurant {
	
	private static final int ID_LENGTH = 6; 
	
	private String id;
	private String name;
	private String password;
	private String address;
	private String phone;
	private String type;
	private int deliveryTime;
	private int favorTimes;
	private List<Dish> menu;
	
	public Restaurant() {
		menu = new ArrayList<Dish>();
	}
	
	/*
	 * Get and set a random generated ID
	 */
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = "res_" + RandomStringUtils.randomAlphanumeric(ID_LENGTH);
	}
	
	/*
	 * Get and set restaurant name
	 */
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	/*
	 * Get and set password for restaurant users
	 */
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	/*
	 * Get and set restaurant address 
	 */
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	/*
	 * Get and set restaurant phone 
	 */
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	/*
	 * Get and set dishes type
	 */
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	/*
	 * Get and set how long will the restaurant deliver
	 * the foods.
	 */
	public int getDeliveryTime() {
		return deliveryTime;
	}
	public void setDeliveryTime(int deliveryTime) {
		this.deliveryTime = deliveryTime;
	}
	
	/*
	 * Get and set how many times the restaurant been favored 
	 */
	public int getFavorTimes() {
		return favorTimes;
	}
	public void setFavorTimes(int favorTimes) {
		this.favorTimes = favorTimes;
	}
	
	/*
	 * Add dish and get menu
	 */
	public List<Dish> addDish(Dish dish) {
		if(menu.contains(dish)) {
			return menu;
		} else {
			menu.add(dish);
			return menu;
		}
	}
	public List<Dish> getMenu() {
		return menu;
	}
}
