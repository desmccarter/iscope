package com.iscope.rest.entity;

import java.net.UnknownHostException;

import com.iscope.db.EntityMongo;
import com.iscope.db.IEntityDB;

public class LocateEntity {

	private IEntityDB entityDb = null;
	
	public void setDB (IEntityDB entityDb){
		this.entityDb=entityDb;
	}
	
	public String get(LocateEntityEnum locate, String val) {
		
		if(locate.equals(LocateEntityEnum.SearchBySpecificName))
		{
			return entityDb.getEntityByName(val);
		}
		else
		if(locate.equals(LocateEntityEnum.SearchAll))
		{
			return entityDb.getAllEntities();
		}
		else
		{
			return "";
		}
	}
}
