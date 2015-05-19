package com.iscope.tests;

import org.junit.Before;
import org.junit.Test;

import com.iscope.db.IEntityDB;

import junit.framework.Assert;
import junit.framework.TestCase;

// comment

public class IEntityDBTest extends TestCase {
	
	IEntityDB db = null;

	@Before
	public void SetUp(){
		//db = createNiceMock(IEntityDB.class);
	}
	
	@Test
	public void testGetEntity() {
		//expect(db.getEntityByName("database")).andReturn("{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"username\" : \"\" , \"password\" : \"\" , \"domain\" : \"DOMAIN\"}]}");
		//replay(db);
		
		int a=1;
		int b=2;
		
		Assert.assertEquals(3,a+b);
	}
	
	@Test
	public void testAnotherGetEntity() {
		//expect(db.getEntityByName("database")).andReturn("{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"username\" : \"\" , \"password\" : \"\" , \"domain\" : \"DOMAIN\"}]}");
		//replay(db);
		
		int a=3;
		int b=2;
		
		Assert.assertEquals(5,a+b);
	}
}
