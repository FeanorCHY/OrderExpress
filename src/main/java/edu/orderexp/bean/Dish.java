package edu.orderexp.bean;

/**
 * Created by Xynoci on 12/3/16.
 */
public class Dish {
    private int dis_id;
    private String dish_name;
    private String description;
    private String pic_path;
    private int rest_id;
    private float price;
    private int stock;

    public Dish() {
    }

    public Dish(String dish_name, String description, String pic_path, int rest_id, float price, int stock) {
        this.dish_name = dish_name;
        this.description = description;
        this.pic_path = pic_path;
        this.rest_id = rest_id;
        this.price = price;
        this.stock = stock;
    }
    
    public Dish(int id, String name, String description, String path, float price) {
        this.dis_id = id;
        this.dish_name = name;
        this.description = description;
        this.pic_path = path;
        this.price = price;
    }

    public int getDis_id() {
        return dis_id;
    }

    public void setDis_id(int dis_id) {
        this.dis_id = dis_id;
    }

    public String getDish_name() {
        return dish_name;
    }

    public void setDish_name(String dish_name) {
        this.dish_name = dish_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPic_path() {
        return pic_path;
    }

    public void setPic_path(String pic_path) {
        this.pic_path = pic_path;
    }

    public int getRest_id() {
        return rest_id;
    }

    public void setRest_id(int rest_id) {
        this.rest_id = rest_id;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
