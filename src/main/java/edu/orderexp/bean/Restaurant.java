package edu.orderexp.bean;

/**
 * Created by Xynoci on 12/3/16.
 */
public class Restaurant {

    private int res_id;
    private String res_name;
    private String res_password;
    private String res_phone;
    private String res_address;
    private String res_type;
    private int res_delivery_time;
    private int res_favor_times;
    private int res_rating;
    public Restaurant() {
    }
    public Restaurant(String res_name) {
        this.res_name = res_name;
    }
    public Restaurant(String res_name, String res_password, String res_address, String res_type, int res_delivery_time) {
        this.res_name = res_name;
        this.res_password = res_password;
        this.res_address = res_address;
        this.res_type = res_type;
        this.res_delivery_time = res_delivery_time;
    }

    public String getRes_phone() {
        return res_phone;
    }

    public void setRes_phone(String res_phone) {
        this.res_phone = res_phone;
    }

    public int getRes_id() {
        return res_id;
    }

    public void setRes_id(int res_id) {
        this.res_id = res_id;
    }

    public String getRes_name() {
        return res_name;
    }

    public void setRes_name(String res_name) {
        this.res_name = res_name;
    }

    public String getRes_password() {
        return res_password;
    }

    public void setRes_password(String res_password) {
        this.res_password = res_password;
    }

    public String getRes_address() {
        return res_address;
    }

    public void setRes_address(String res_address) {
        this.res_address = res_address;
    }

    public String getRes_type() {
        return res_type;
    }

    public void setRes_type(String res_type) {
        this.res_type = res_type;
    }

    public int getRes_delivery_time() {
        return res_delivery_time;
    }

    public void setRes_delivery_time(int res_delivery_time) {
        this.res_delivery_time = res_delivery_time;
    }

    public int getRes_favor_times() {
        return res_favor_times;
    }

    public void setRes_favor_times(int res_favor_times) {
        this.res_favor_times = res_favor_times;
    }

    public int getRes_rating() {
        return res_rating;
    }

    public void setRes_rating(int res_rating) {
        this.res_rating = res_rating;
    }
}
