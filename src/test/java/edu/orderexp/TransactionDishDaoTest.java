package edu.orderexp;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import edu.orderexp.dao.TransactionDishDao;

public class TransactionDishDaoTest {
	TransactionDishDao tdDao;
	
	@Before
	public void setUp() throws Exception {
		tdDao = new TransactionDishDao();
	}

	@Test
	public void test() {
		System.out.println(tdDao.insertTransactionDish(1, 1, 2));
		assertTrue(true);;
	}

}
