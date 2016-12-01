package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 */

import java.math.BigDecimal;
import org.apache.commons.lang.RandomStringUtils;

public class Dish {
	
	private static final int ID_LENGTH = 6; 

	private String id;
	private String resId;
	private String name;
	private BigDecimal price;
	private String description;
	private String picPath;
	
	/*
	 * Get and set dish id
	 */
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = "dish_" + RandomStringUtils.randomAlphanumeric(ID_LENGTH);
	}
	
	/*
	 * Get and set restaurant id for the dish
	 */
	public String getResId() {
		return resId;
	}
	public void setResId(String resId) {
		this.resId = resId;
	}
	
	/*
	 * Get and set dish name
	 */
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	/*
	 * Get and set dish price
	 */
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	/*
	 * Get and set description for dish
	 */
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	/*
	 * Get and set dish picture local path
	 */
	public String getPicPath() {
		return picPath;
	}
	public void setPicPath(String picPath) {
		this.picPath = picPath;
	}
	
}
