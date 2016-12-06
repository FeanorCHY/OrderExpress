package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 * 
 */

import java.util.ArrayList;
import java.util.List;

public class Customer {
		
	private int cus_id;
	private String cus_name;
	private String cus_password;
	private String cus_gender;
	private int cus_age;
	private String cus_email;
	private String cus_address;
	private String cus_phone;
	private List<Dish> favors;
	
	public Customer() {
		favors = new ArrayList<Dish>();
	}

	public Customer(String cus_email){
		this.setCus_email(cus_email);
	}

	public Customer(String cus_email, String cus_password){
        this.setCus_email(cus_email);
        this.setCus_password(cus_password);
    }

	public Customer(String cus_name, String cus_password, String cus_gender, int cus_age, String cus_email, String cus_address, String cus_phone) {
		this.cus_name = cus_name;
		this.cus_password = cus_password;
		this.cus_gender = cus_gender;
		this.cus_age = cus_age;
		this.cus_email = cus_email;
		this.cus_address = cus_address;
		this.cus_phone = cus_phone;
	}


	public Customer(int cus_id, String cus_name, String cus_password, String cus_gender, int cus_age, String cus_email, String cus_address, String cus_phone) {
		this.cus_id = cus_id;
		this.cus_name = cus_name;
		this.cus_password = cus_password;
		this.cus_gender = cus_gender;
		this.cus_age = cus_age;
		this.cus_email = cus_email;
		this.cus_address = cus_address;
		this.cus_phone = cus_phone;
	}

	public int getCus_id() {
		return cus_id;
	}

	public void setCus_id(int cus_id) {
		this.cus_id = cus_id;
	}

	public String getCus_name() {
		return cus_name;
	}

	public void setCus_name(String cus_name) {
		this.cus_name = cus_name;
	}

	public String getCus_password() {
		return cus_password;
	}

	public void setCus_password(String cus_password) {
		this.cus_password = cus_password;
	}

	public String getCus_gender() {
		return cus_gender;
	}

	public void setCus_gender(String cus_gender) {
		this.cus_gender = cus_gender;
	}

	public int getCus_age() {
		return cus_age;
	}

	public void setCus_age(int cus_age) {
		this.cus_age = cus_age;
	}

	public String getCus_email() {
		return cus_email;
	}

	public void setCus_email(String cus_email) {
		this.cus_email = cus_email;
	}

	public String getCus_address() {
		return cus_address;
	}

	public void setCus_address(String cus_address) {
		this.cus_address = cus_address;
	}

	public String getCus_phone() {
		return cus_phone;
	}

	public void setCus_phone(String cus_phone) {
		this.cus_phone = cus_phone;
	}

	public List<Dish> getFavDishes() {
		return this.favors;
	}
		
}
