package edu.orderexp;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import edu.orderexp.bean.Transaction;

public class TransactionTest {
	
	Transaction tran;
	
	@Before
	public void setUp() throws Exception {
		tran = new Transaction();
	}

	@Test
	public void test() {
		System.out.println(tran.getTime());
		assertTrue(true);
	}

}
