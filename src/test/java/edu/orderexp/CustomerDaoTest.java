package edu.orderexp;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import edu.orderexp.dao.CustomerDao;

public class CustomerDaoTest {
	
	private CustomerDao cd;
	
	@Before
	public void setUp() throws Exception {
		cd = new CustomerDao();
	}

	@Test
	public void test() {
		int autoKey = cd.insertCustomer("name2", "2134567", "female", 18, "siz17@pitt.edu", "2 Bayard Rd", "13453672839");
		assertEquals(2, autoKey);
	}

}
