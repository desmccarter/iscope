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

		try {
			EntityMongo entityDb = new EntityMongo();
		
			entityDb.removeAllEntities();

			BasicDBObject webRecord = createWebRecord();
			
			entityDb.insertEntity("web",webRecord);
			
			BasicDBObject databaseRecord = createDatabaseRecord();
			
			entityDb.insertEntity("database",databaseRecord);

			entityDb.insertEntity("user", "images/icons/user.jpg");
			
			entityDb.insertEntity("queue", "images/icons/queue.png");
	        
			entityDb.insertEntity("file", "images/icons/fileserver.png");
	        
			entityDb.insertEntity("api", "images/icons/api.png");
	 
			entityDb.insertEntity("service", "images/icons/service.png");
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private static BasicDBObject createDatabaseRecord() {
		BasicDBList databaseRecordInputsList = new BasicDBList();
		
		databaseRecordInputsList.add(new BasicDBObject("name","username").append("type", "string") );
		databaseRecordInputsList.add(new BasicDBObject("name","password").append("type", "string") );
		databaseRecordInputsList.add(new BasicDBObject("name","server").append("type", "string") );
		databaseRecordInputsList.add(new BasicDBObject("name","database type").append("type", "string") );
		
		BasicDBObject databaseRecord = 
				new BasicDBObject("_id","database").append("name","database")
				.append("src", "images/icons/database.jpg");		
		
		databaseRecord.put("inputs", databaseRecordInputsList);
		return databaseRecord;
	}
	
	private static BasicDBObject createWebRecord() {
		BasicDBList databaseRecordInputsList = new BasicDBList();
		
		databaseRecordInputsList.add(new BasicDBObject("name","username").append("type", "string") );
		databaseRecordInputsList.add(new BasicDBObject("name","password").append("type", "string") );
		databaseRecordInputsList.add(new BasicDBObject("name","server").append("type", "string") );
		databaseRecordInputsList.add(new BasicDBObject("name","webserver type").append("type", "string") );
		
		BasicDBObject databaseRecord = 
				new BasicDBObject("_id","web").append("name","web")
				.append("src", "images/icons/web.jpg");		
		
		databaseRecord.put("inputs", databaseRecordInputsList);
		return databaseRecord;
	}
}
