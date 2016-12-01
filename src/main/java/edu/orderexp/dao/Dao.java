package edu.orderexp.dao;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by Xynoci on 11/30/16.
 */
public interface Dao<T> {
    List<T> fetchAll();
    T fetchElementById(int id);
    T add(T t) throws SQLException;
    boolean exist(T t);
    boolean updateById(int id) throws SQLException;
    boolean deleteById(int id) throws SQLException;
}
