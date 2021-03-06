package com.iscope.db.tests.integration;

import java.net.UnknownHostException;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;

import com.iscope.db.EntityMongo;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;

public class EntityMongoTest {
	
	private EntityMongo entityMongo = null;
	
	@Before 
	public void setup(){
		try {
			
			if(entityMongo==null)
			{
				entityMongo = new EntityMongo();
			}
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Test
	public void getDatabaseJSON() {
	
		String json = entityMongo.getEntityByName("database");
		
		String expectedJson =
				"{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"name\" : \"username\" , \"type\" : \"string\"} , { \"name\" : \"password\" , \"type\" : \"string\"} , { \"name\" : \"server\" , \"type\" : \"string\"} , { \"name\" : \"database type\" , \"type\" : \"string\"}]}";
		
		Assert.assertEquals(expectedJson, json);
	}
	
	@Test
	public void getFileJSON() {
	
		String json = entityMongo.getEntityByName("file");
		
		String expectedJson =
				"{ \"_id\" : \"file\" , \"name\" : \"file\" , \"src\" : \"images/icons/fileserver.png\"}";
		
		Assert.assertEquals(expectedJson, json);
	}
	
	@Test
	public void getUserJSON() {
	
		String json = entityMongo.getEntityByName("user");
		
		String expectedJson =
				"{ \"_id\" : \"user\" , \"name\" : \"user\" , \"src\" : \"images/icons/user.jpg\"}";
		
		Assert.assertEquals(expectedJson, json);
	}
	
	@Test
	public void getQueueJSON() {
	
		String json = entityMongo.getEntityByName("queue");
		
		String expectedJson =
				"{ \"_id\" : \"queue\" , \"name\" : \"queue\" , \"src\" : \"images/icons/queue.png\"}";
		
		Assert.assertEquals(expectedJson, json);
	}
	
	@Test
	public void getServiceJSON() {
	
		String json = entityMongo.getEntityByName("service");
		
		String expectedJson =
				"{ \"_id\" : \"service\" , \"name\" : \"service\" , \"src\" : \"images/icons/service.png\"}";
		
		Assert.assertEquals(expectedJson, json);
	}
	
	@Test
	public void getApiJSON() {
	
		String json = entityMongo.getEntityByName("api");
		
		String expectedJson =
				"{ \"_id\" : \"api\" , \"name\" : \"api\" , \"src\" : \"images/icons/api.png\"}";
		
		Assert.assertEquals(expectedJson, json);
	}
}
