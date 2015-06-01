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
	
	private static EntityMongo entityMongo = null;
	
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
				"{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"username\" : \"\" , \"password\" : \"\" , \"domain\" : \"DOMAIN\"}]}";
		
		Assert.assertEquals(expectedJson, json);
	}
	
	@Test
	public void getFileJSON() {
	
		String json = entityMongo.getEntityByName("file");
		
		// *** this should fail as it stands ...
		String expectedJson =
				"{ \"_id\" : \"database\" , \"name\" : \"database\" , \"src\" : \"images/icons/database.jpg\" , \"inputs\" : [ { \"username\" : \"\" , \"password\" : \"\" , \"domain\" : \"DOMAIN\"}]}";
		
		Assert.assertEquals(expectedJson, json);
	}
}
