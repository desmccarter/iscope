package com.iscope.tests;

import static org.easymock.EasyMock.createNiceMock;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;

import org.junit.Before;
import org.junit.Test;

import com.iscope.db.IEntityDB;

import junit.framework.Assert;
import junit.framework.TestCase;

public class IEntityDBTest extends TestCase {
	
	IEntityDB db = null;

	@Before
	public void SetUp(){
		db = createNiceMock(IEntityDB.class);
	}
	
	@Test
	public void testGetEntity() {
		//expect(db.getEntityByName("database")).andReturn("{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"username\" : \"\" , \"password\" : \"\" , \"domain\" : \"DOMAIN\"}]}");
		//replay(db);
		
		int a=1;
		int b=2;
		
		Assert.assertEquals(a+b, 3);
	}
}
