package edu.orderexp.services;

import com.google.gson.Gson;

import org.apache.log4j.Logger;

import java.util.HashMap;

import edu.orderexp.bean.Customer;
import edu.orderexp.dao.CustomerDao;
import spark.Session;

import static edu.orderexp.util.JsonTransformer.fromJson;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

public class CustomerService {
    final static Logger logger = Logger.getLogger(CustomerService.class);
    private Gson gson = new Gson();
    private Customer customer = new Customer();
    private CustomerDao cd;

    private int id;

    public CustomerService(CustomerDao cd) {
        super();
        this.cd = cd;
        this.startService();
    }

    private void startService() {
        /* ---------------- User ---------------- */
        // register
        post("/register", (req, res) -> {
            // http://stackoverflow.com/questions/17742633/how-read-data-sent-by-client-with-spark
            HashMap<String, Object> attributes = new HashMap<>();
            customer = fromJson(req.body(), Customer.class);

            if (cd.exist(customer)) {
                res.status(409);
                attributes.put("statusMsg", "Email has already been taken. Use other ones please.");
            } else {
                customer = cd.add(customer);
                attributes.put("customer", customer);
                attributes.put("statusMsg", "Registration succeeded. Redirecting page...");
            }
            return gson.toJson(attributes);
        });

        //login
        post("/login", (req, res) -> {
            return "Hello: " + req.params(":id");
        });

        //get users info
        get("/user/:cus_id", (req, res) -> {
            return "Hello: " + req.params(":id");
        });

        //update users info
        put("/user/:cus_id", (req, res) -> {
            String cus_id = req.params(":cus_id");

            return "Hello: " + req.params(":id");
        });

    }

    private Customer login(Customer c){
        return new Customer();
    }


}
