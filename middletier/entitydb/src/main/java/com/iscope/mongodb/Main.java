/**
 * 
 */
package com.iscope.mongodb;

import java.net.UnknownHostException;
import java.util.List;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

/**
 * @author Des.McCarter
 *
 */
public class Main {
	
    private static DBObject createDBObject(User user) {
        BasicDBObjectBuilder docBuilder = BasicDBObjectBuilder.start();
                                 
        docBuilder.append("_id", user.getId());
        docBuilder.append("name", user.getName());
        
        return docBuilder.get();
    }
	
	/**
	 * @param args
	 * @throws UnknownHostException 
	 */
	public static void main(String[] args) throws UnknownHostException {
		
		EntityDB entityDb = new EntityDB();
		
		entityDb.insertEntity("database","images/icons/database.jpg");
				
		entityDb.insertEntity("queue", "images/icons/queue.png");
        
		entityDb.insertEntity("file", "images/icons/fileserver.png");
        
		entityDb.insertEntity("api", "images/icons/api.png");
 
		entityDb.insertEntity("service", "images/icons/service.png");
				
		entityDb.showEntityByName("service");
		
		System.out.println("hello mum!");
	}
}
