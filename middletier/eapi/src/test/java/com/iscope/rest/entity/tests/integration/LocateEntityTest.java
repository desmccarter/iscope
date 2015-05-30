package com.iscope.rest.entity.tests.integration;

import java.net.UnknownHostException;

import junit.framework.Assert;

import org.junit.Test;


import com.iscope.db.EntityMongo;
import com.iscope.db.IEntityDB;
import com.iscope.rest.entity.LocateEntity;
import com.iscope.rest.entity.LocateEntityEnum;

public class LocateEntityTest {
 
    private final LocateEntity locateEntity = new LocateEntity();
	
	@Test
	public void testGetJSONForQueue(){
		
		String expectedJSON = "{ \"_id\" : \"queue\" , \"name\" : \"queue\" , \"src\" : \"images/icons/queue.png\"}";
		
		testMongoResponse("queue", expectedJSON);
	}
	
	@Test
	public void testGetJSONForDatabase(){
		
		String expectedJSON = "{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"username\" : \"\" , \"password\" : \"\" , \"domain\" : \"DOMAIN\"}]}";
		
		testMongoResponse("database", expectedJSON);
	}
	
	private void testMongoResponse(String request, String expectedOutput) {
		
		IEntityDB db=null;
		
		try {
			db = new EntityMongo();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		db.getEntityByName(request);
	     
		locateEntity.setDB(db);
		
	    String output = locateEntity.get(LocateEntityEnum.SearchBySpecificName, request);
	    
	    Assert.assertEquals(expectedOutput, output);
	}
}