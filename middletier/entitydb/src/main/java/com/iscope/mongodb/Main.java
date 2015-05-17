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

		
		System.out.println(entityDb.getEntityByName("database"));
	}
}
