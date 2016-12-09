package edu.orderexp.services;

import com.google.gson.Gson;
import edu.orderexp.bean.Customer;
import edu.orderexp.dao.CustomerDao;
import org.apache.log4j.Logger;
import spark.Session;

import java.util.HashMap;

import static edu.orderexp.util.JsonTransformer.fromJson;
import static spark.Spark.*;

public class CustomerService {
    final static Logger logger = Logger.getLogger(CustomerService.class);
    private Gson gson = new Gson();
    private Customer customer = new Customer();
    private CustomerDao cd;

    private int id;

    public CustomerService(CustomerDao cd) {
        super();
        this.cd = cd;
    }

    public void startService() {
        /* ---------------- User ---------------- */
        // register
        post("/user/register", (request, response) -> {
            // http://stackoverflow.com/questions/17742633/how-read-data-sent-by-client-with-spark
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);
            customer = fromJson(request.body(), Customer.class);

            if (cd.exist(customer)) {
                // http://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
                response.status(409);
                attributes.put("statusMsg", "Email has already been taken. Use other ones please.");
            } else {
                customer = cd.add(customer);
                attributes.put("customer", customer);
                attributes.put("statusMsg", "Registration succeeded. Redirecting page...");
                // log in
                customer.setCus_password(""); // exclude password
                session.attribute("customer", customer);
                logger.info(customer.getCus_email() + " login at registration.");
            }
            return gson.toJson(attributes);
        });

        //login
        post("/login", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);
            customer = fromJson(request.body(), Customer.class);

            if (cd.exist(customer)) {
                customer = cd.authenticate(customer);
                if (customer != null) {
                    session.attribute("customer", customer);
                    attributes.put("customer", customer);
                    attributes.put("statusMsg", "Log in success.");
                    logger.info(customer.getCus_email() + " login.");
                } else {
                    response.status(422); // HTTP 422 (Unprocessable Entity)
                    attributes.put("statusMsg", "Password not match.");
                }
            } else {
                response.status(404);
                attributes.put("statusMsg", "Unregistered.");
            }
            return gson.toJson(attributes);
        });

        // get customers from database
        get("/user/:cus_id", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);

            int cus_id = Integer.parseInt(request.params("cus_id"));
            customer = cd.fetchElementById(cus_id);

            if (customer != null) {
                session.attribute("customer", customer);
                attributes.put("customer", customer);
                attributes.put("statusMsg", "Customer exists. ");
                logger.info(customer.getCus_email() + " exists. ");
            } else {
                response.status(404); //not found
                attributes.put("statusMsg", "Customer inexisted. ");
            }

            return gson.toJson(attributes);
        });

        // update users info in database
        put("/user/:cus_id", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);
            // http://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request
            customer = fromJson(request.body(), Customer.class);
            int cus_id = Integer.parseInt(request.params(":cus_id"));
            boolean updateSuccess = cd.updateById(cus_id, customer);

            if (updateSuccess) {
                session.attribute("customer", customer);
                attributes.put("customer", customer);
                attributes.put("statusMsg", "Profile update succeed.");
                logger.info(customer.getCus_email() + " update profile.");
            } else {
                response.status(403); //forbidden
                attributes.put("statusMsg", "Update failed.");
            }

            return gson.toJson(attributes);
        });

        // check whether email existence at registration
        get("/user/email/:cus_email", (request, response) -> {
            String cus_email = request.params(":cus_email");
            HashMap<String, Object> attributes = new HashMap<>();
            customer = new Customer(cus_email);

            if (cd.exist(customer)) {
                attributes.put("statusMsg", "Email exists.");
            } else {
                response.status(404);
                attributes.put("statusMsg", "Unregistered email.");
            }
            return gson.toJson(attributes);
        });

        // return the logged user.
        get("/logStatus", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);
            // business logic
            if (session.attribute("customer") != null) {
                attributes.put("customer", session.attribute("customer"));
            }
            // create log in status for test only
//            Customer mockCustomer = new Customer(29, "test_let_us_use_a_long_name", "123@#123", "male", 16, "1@1.com", "135 N Bellefield Ave, Unit 403, Pittsburgh PA 15213", "4124270607");
//            session.attribute("customer", mockCustomer);
//            attributes.put("customer", session.attribute("customer"));

            return gson.toJson(attributes);
        });

        get("/logout", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            Session session = request.session(true);
            if (session.attribute("customer") != null) {
                session.removeAttribute("customer");
                attributes.put("statusMsg", "User log out.");
                logger.info(customer.getCus_email() + " logout.");
            }
            return gson.toJson(attributes);
        });

        delete("user/:cus_id", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            boolean success = cd.deleteById(Integer.parseInt(request.queryParams(":cus_id")));
            if (success) {
                attributes.put("statusMsg", "Delete success.");
            } else {
                attributes.put("statusMsg", "Delete fail.");
            }
            return gson.toJson(attributes);
        });

    }

    private Customer login(Customer c) {
        boolean isLoggedin = cd.exist(c);
        return new Customer();
    }
}
