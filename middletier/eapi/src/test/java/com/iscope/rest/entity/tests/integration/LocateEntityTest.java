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
	public void testGetJSONForService(){
		
		String expectedJSON = "{ \"_id\" : \"service\" , \"name\" : \"service\" , \"src\" : \"images/icons/service.png\"}";
		
		testMongoResponse("service", expectedJSON);
	}
    
	@Test
	public void testGetJSONForFile(){
		
		String expectedJSON = "{ \"_id\" : \"file\" , \"name\" : \"file\" , \"src\" : \"images/icons/fileserver.png\"}";
		
		testMongoResponse("file", expectedJSON);
	}
    
	@Test
	public void testGetJSONForApi(){
		
		String expectedJSON = "{ \"_id\" : \"api\" , \"name\" : \"api\" , \"src\" : \"images/icons/api.png\"}";
		
		testMongoResponse("api", expectedJSON);
	}
    
	@Test
	public void testGetJSONForQueue(){
		
		String expectedJSON = "{ \"_id\" : \"queue\" , \"name\" : \"queue\" , \"src\" : \"images/icons/queue.png\"}";
		
		testMongoResponse("queue", expectedJSON);
	}
	
	@Test
	public void testGetJSONForDatabase(){
		
		String expectedJSON = "{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"name\" : \"username\" , \"type\" : \"string\"} , { \"name\" : \"password\" , \"type\" : \"string\"} , { \"name\" : \"server\" , \"type\" : \"string\"} , { \"name\" : \"database type\" , \"type\" : \"string\"}]}";
		
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