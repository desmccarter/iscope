package com.iscope.rest.entity;

import java.net.UnknownHostException;

import com.iscope.db.EntityMongo;

public class ProcessAll {

	public static String get() {
		
		String output="";
		
        try {
			EntityMongo entityDb = new EntityMongo();
			
	        output=entityDb.getAllEntities();
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        return output;
	}
}
