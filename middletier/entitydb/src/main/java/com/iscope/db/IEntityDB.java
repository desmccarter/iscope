package com.iscope.db;

import com.mongodb.BasicDBObject;

public interface IEntityDB {

	public boolean entityExists(String entityName);
	
	public void removeAllEntities();
	
	public void insertEntity(String id, BasicDBObject data);
	
	public void insertEntity(String name, String imgSrc);
	
	public void showAllEntities();
	
	public void showEntityByName(String name);
	
	public String getEntityByName(String name);
	
	public String getAllEntities();
	
}
