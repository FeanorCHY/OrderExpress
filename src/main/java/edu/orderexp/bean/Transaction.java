package edu.orderexp.bean;

/**
 * @author siying
 * @date 11/15/2016
 */

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

public class Transaction {

    private int tran_id;
    private int cus_id;
    private long tran_date;
    private float total_price;
    private HashMap<Integer, Restaurant> restaurants = new HashMap<Integer, Restaurant>();
    private Map<Dish, Integer> dishs = new HashMap<>();    //Dish->Quantity

    public Transaction() {

    }

    public Transaction(int tran_id) {
        this.tran_id = tran_id;
    }

    public Transaction(int tran_id, Date tran_date, float total_price) {

        this.tran_id = tran_id;
        this.tran_date = tran_date.getTime();
        this.total_price = total_price;
    }

    public int getTran_id() {
        return tran_id;
    }

    public void setTran_id(int tran_id) {
        this.tran_id = tran_id;
    }

    public int getCus_id() {
        return cus_id;
    }

    public void setCus_id(int cus_id) {
        this.cus_id = cus_id;
    }

    public Date getTran_date() {
        return new Date(tran_date);
    }

    public void setTran_date(Date tran_date) {
        this.tran_date = tran_date.getTime();
    }

    public float getTotal_price() {
        return total_price;
    }

    public void setTotal_price(float total_price) {
        this.total_price = total_price;
    }

    public HashMap<Integer, Restaurant> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(HashMap<Integer, Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public Map<Dish, Integer> getDishs() {
        return dishs;
    }

    public void setDishs(Map<Dish, Integer> dishs) {
        this.dishs = dishs;
    }

    //Add dish to list
    public void addDish(Dish dish, int qty) {
        if (dishs.containsKey(dish)) {
            dishs.put(dish, dishs.get(dish) + qty);
        } else {
            dishs.put(dish, qty);
        }
    }

    public void addRestaurant(Restaurant restaurant) {
        if (!this.getRestaurants().containsKey(restaurant.getRes_id())) {
            restaurants.put(restaurant.getRes_id(), restaurant);
        }
    }

}
