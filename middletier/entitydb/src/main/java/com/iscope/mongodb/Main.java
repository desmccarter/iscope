/**
 * 
 */
package com.iscope.mongodb;

import java.net.UnknownHostException;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;

/**
 * @author Des.McCarter
 *
 */
public class Main {
	
	/**
	 * @param args
	 * @throws UnknownHostException 
	 */
	public static void main(String[] args) throws UnknownHostException {
		createEntityEntries();
	}
	
	private static void createEntityEntries(){
		

		

		try {
			EntityDB entityDb = new EntityDB();
		
			entityDb.removeAllEntities();
			
			BasicDBObject userRecord = 
					new BasicDBObject("_id","user").append("name","user")
					.append("src", "images/icons/user.jpg");
			
			BasicDBList userInputsList = new BasicDBList();
			
			userInputsList.add(new BasicDBObject("url","").append("username", "").append("password", ""));
			
			userRecord.put("inputs", userInputsList);
			
			entityDb.insertEntity("user",userRecord);
			
			BasicDBObject record = 
					new BasicDBObject("_id","database").append("name","database")
					.append("src", "images/icons/database.jpg");
			
			BasicDBList inputsList = new BasicDBList();
			
			inputsList.add(new BasicDBObject("username","").append("password", "").append("domain", "DOMAIN"));
			
			record.put("inputs", inputsList);
			
			entityDb.insertEntity("database",record);
			
			entityDb.insertEntity("queue", "images/icons/queue.png");
	        
			entityDb.insertEntity("file", "images/icons/fileserver.png");
	        
			entityDb.insertEntity("api", "images/icons/api.png");
	 
			entityDb.insertEntity("service", "images/icons/service.png");
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
