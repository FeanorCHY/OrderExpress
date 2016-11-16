package edu.orderexp;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import edu.orderexp.bean.Customer;

public class CustomerTest {
	
	Customer customer;
	Customer customer2;
	
	@Before
	public void setUp() throws Exception {
		customer = new Customer();
		customer2 = new Customer();
	}

	@Test
	public void test() {
		customer.setId();
		String id1 = customer.getId();
		
		customer.setId();
		String id2 = customer.getId();
		System.out.println(id1 + ", " + id2);
		assertNotEquals(id1, id2);
	}

}
