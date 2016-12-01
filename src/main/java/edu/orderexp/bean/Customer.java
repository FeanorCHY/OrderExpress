package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 * 
 */

import org.apache.commons.lang.RandomStringUtils;

import edu.orderexp.dao.CustomerDao;

import java.util.ArrayList;
import java.util.List;

public class Customer {
	
	private static final int ID_LENGTH = 6; 
	
	private int id;
	private String name;
	private String password;
	private String gender;
	private int age;
	private String email;
	private String address;
	private String phone;
	private List<Dish> favors;
	
	public Customer() {
		favors = new ArrayList<Dish>();
	}
	
	public Customer(String id, String name, String password, String gender, int age, 
			String email, String address, String phone) {
		
	}
	
	/*
	 * Get and Set Customer ID
	 */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	/*
	 * Get and Set Customer Name
	 */
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	/*
	 * Get and Set Customer Password
	 */
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	/*
	 * Get and Set Customer Gender
	 */
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	/*
	 * Get and Set Customer Age
	 */
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
	/*
	 * Get and Set Customer Email
	 */
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	/*
	 * Get and Set Customer Address
	 */
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	/*
	 * Get and Set Customer Phone
	 */
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	/*
	 * Add favorite dishes
	 */
	public List<Dish> addFavDish(Dish dish) {
		if(!favors.contains(dish)) this.favors.add(dish);
		return this.favors;
	}
	
	public List<Dish> getFavDishes() {
		return this.favors;
	}
	
	public int addCustomer(String name, String password, String gender, int age, 
			String emailAddress, String address, String phone) {
		this.name = name;
		this.password = password;
		this.gender = gender;
		this.age = age;
		this.email = emailAddress;
		this.address = address;
		this.phone = phone;
		
		CustomerDao cd = new CustomerDao();
		
		if(cd.notExist(email)) {
			this.id = cd.insertCustomer(name, password, gender, age, email, address, phone);
			return id;
		} else {
			return -1;
		}
	}
		
}
