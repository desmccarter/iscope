package com.iscope.mongodb;

import java.net.UnknownHostException;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class EntityDB {
	
	private MongoClient mongo = null;
	private DB db = null;
	
	private String dbName="scope";
	
	private String dbCollectionName="Entities";
	
	public EntityDB() throws UnknownHostException {
		mongo = new MongoClient("localhost",27017);
		db = mongo.getDB(dbName);
	}
	
	private boolean entityExists(String entityName) {
		BasicDBObject whereQuery = new BasicDBObject();
		
		whereQuery.put("name", entityName);

		DBCollection col = db.getCollection(dbCollectionName);
		
		DBCursor cursor = col.find(whereQuery);
		
		return cursor.hasNext();
	}
	
	public void removeAllEntities()
	{
		DBCollection col = db.getCollection(dbCollectionName);
		col.drop();
	}
	
	public void insertEntity(String id, BasicDBObject data)
	{
		DBCollection col = db.getCollection(dbCollectionName);
		
		if( !entityExists(id) ) 
		{
			col.insert(data);
		}
	}
	
	public void insertEntity(String name, String imgSrc) {
		
		DBCollection col = db.getCollection(dbCollectionName);
		
		if( !entityExists(name) ) 
		{
			col.insert( new BasicDBObject("_id",name)
				.append("name",name).append("src", imgSrc) );
		}
	}
	
	public void showAllEntities()
	{
		DBCollection col = db.getCollection(dbCollectionName);
		
		DBCursor cursor = col.find();
		
		while(cursor.hasNext()) {
		    System.out.println(cursor.next());
		}
	}
	
	public void showEntityByName(String name) {
	
		BasicDBObject whereQuery = new BasicDBObject();
		whereQuery.put("name", name);

		DBCollection col = db.getCollection(dbCollectionName);
		
		DBCursor cursor = col.find(whereQuery);
		
		while(cursor.hasNext()) {
		    System.out.println(cursor.next());
		}
	}
	
	public String getEntityByName(String name) {
		
		BasicDBObject whereQuery = new BasicDBObject();
		whereQuery.put("name", name);

		DBCollection col = db.getCollection(dbCollectionName);
		
		DBCursor cursor = col.find(whereQuery);
		
		String entity = null;
		
		if(cursor.hasNext()) {
		    entity=cursor.next().toString();
		}
		
		return entity;
	}
	
	public String getAllEntities() {
		
		DBCollection col = db.getCollection(dbCollectionName);
		
		DBCursor cursor = col.find();
				
		BasicDBList dbList = new BasicDBList();
		
		while(cursor.hasNext()) {
			dbList.add(cursor.next());
		}
		
		return dbList.toString();
	}
}
