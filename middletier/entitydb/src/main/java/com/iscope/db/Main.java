/**
 * 
 */
package com.iscope.db;

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
		
		BasicDBObject record = 
				new BasicDBObject("_id","database").append("name","database")
				.append("src", "images/icons/database.jpg");		

		try {
			EntityMongo entityDb = new EntityMongo();
		
			entityDb.removeAllEntities();
			
			BasicDBList inputsList = new BasicDBList();
			
			inputsList.add(new BasicDBObject("name","username").append("type", "string") );
			inputsList.add(new BasicDBObject("name","password").append("type", "string") );
			inputsList.add(new BasicDBObject("name","server").append("type", "string") );
			inputsList.add(new BasicDBObject("name","database type").append("type", "string") );
			
			record.put("inputs", inputsList);

			entityDb.insertEntity("user", "images/icons/user.jpg");
			
			entityDb.insertEntity("web", "images/icons/web.jpg");
			
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
