package edu.orderexp.util;

import com.google.gson.Gson;

/**
 * Created by Makone_Xia on 11/30/16.
 */
public class JsonTransformer {

    public static String toJson(Object object) {
        return new Gson().toJson(object);
    }

    public static <T> T fromJson(String json, Class<T> classe) {
        return new Gson().fromJson(json, classe);
    }

}
