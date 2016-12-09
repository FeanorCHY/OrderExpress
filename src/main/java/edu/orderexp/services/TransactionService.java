package edu.orderexp.services;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import edu.orderexp.bean.Transaction;
import edu.orderexp.dao.TransactionDao;
import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static spark.Spark.get;
import static spark.Spark.post;

public class TransactionService {

    final static Logger logger = Logger.getLogger(CustomerService.class);
    private TransactionDao td;
    private Gson gson = new Gson();

    public TransactionService(TransactionDao td) {
        super();
        this.td = td;
    }

    public void startService() {

        //post a transaction
        post("/transaction/", (request, response) -> {
            String transactionJson = request.body();

            JsonObject jsonObject = new JsonParser().parse(transactionJson).getAsJsonObject();

            return "Hello: " + request.params(":id");
        });

        //get all transaction for user
        get("/transaction/user/:cus_id", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            //Session session = request.session(true);
            int cus_id = Integer.parseInt(request.params(":cus_id"));
            HashMap<Integer, Transaction> transactions = td.fetchAllByCusId(cus_id);
            if (transactions != null) {
                attributes.put("statusMsg", "Transactions fetched successfully");
                attributes.put("transactions", transactions);
                logger.info("Customer " + cus_id + " 's transactions are fetched. ");
            } else {
                response.status(204); //No Content
                attributes.put("statusMsg", "No transaction found. ");
                attributes.put("trans_list", null);
            }
            return gson.toJson(attributes);
        });

        //Get transaction detail for user
        get("/transaction/:tran_id", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            int tran_id = Integer.parseInt(request.params(":tran_id"));
            //Session session = request.session(true);

            List<Map<String, Object>> details = td.fetchDetailByTranId(tran_id);
            if (details != null) {
                attributes.put("statusMsg", "Transaction details are fetched. ");

                JsonArray trans_detail = new JsonArray();
                System.out.println("yes");
                for (Map<String, Object> d : details) {
                    JsonObject metaObject = new JsonObject();
                    metaObject.addProperty("res_id", (int) d.get("res_id"));
                    metaObject.addProperty("res_name", String.valueOf(d.get("res_name")));
                    metaObject.addProperty("dish_id", (int) d.get("dish_id"));
                    metaObject.addProperty("dish_name", String.valueOf(d.get("dish_name")));
                    metaObject.addProperty("price", (float) d.get("price"));
                    metaObject.addProperty("pic_path", String.valueOf(d.get("pic_path")));
                    metaObject.addProperty("quantity", (int) d.get("quantity"));

                    trans_detail.add(metaObject);
                }
                attributes.put("trans_detail", trans_detail);
            } else {
                response.status(204); //no content
                attributes.put("statusMsg", "No transaction details. ");
            }

            return gson.toJson(attributes);
        });

        //get all transaction for restaurant
//        get("/tranaction/restaurant/:cus_id", (request, response) -> {
//            HashMap<String, Object> attributes = new HashMap<>();
//            Session session = request.session(true);
//
//            int cus_id = Integer.parseInt(request.params("cus_id"));
//            List<Transaction> transactions = td.fetchAllbyCusId(cus_id);
//
//            if (transactions != null) {
//                //do I need to add customer to the session
//                session.attribute("transactions", transactions);
//                attributes.put("transactions", transactions);
//                attributes.put("statusMsg", "Transactions fetched successfully");
//                logger.info("Customer" + cus_id + " 's transactions are fetched. ");
//            } else {
//                response.status(204); //No Content
//                attributes.put("statusMsg", "No transaction found. ");
//            }
//
//            return gson.toJson(attributes);
//        });

        //Get transaction detail for restaurant
        get("/transaction/:tran_id/:res_id", (request, response) -> {
            HashMap<String, Object> attributes = new HashMap<>();
            return gson.toJson(attributes);
        });
    }
}
