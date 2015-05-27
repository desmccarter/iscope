package com.iscope.rest.entity;

import java.net.UnknownHostException;

import com.iscope.db.EntityMongo;

public class ProcessEntity {

	public static String get(String id) {

		String output=null;
		
        try {
        	
		    if( (id!=null) && (id.length()>0) )
			{
				output = (new EntityMongo()).getEntityByName(id);		
			}

		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
        
		return output;
	}
}
