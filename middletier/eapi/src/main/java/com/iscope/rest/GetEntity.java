package com.iscope.rest;

import java.net.UnknownHostException;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.iscope.mongodb.*;

@Path("getentity")
public class GetEntity {
    
    @GET
    @Path("/{parameter}")
    public Response responseMsg( @PathParam("parameter") String parameter,
            @DefaultValue("Not given") @QueryParam("id") String id) {
 

        if( (id!=null) && (id.length()>0) )
		{
        	if( (parameter!=null) && (parameter.length()>0) && (parameter.equals("entity")) )
        	{
	        	String entityId=id;
	        	
	            String output = "Entity ID = " + entityId;
	            
	            EntityDB entityDb=null;
	            
	            try {
					entityDb = new EntityDB();
				} catch (UnknownHostException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	            
	            output=entityDb.getEntityByName(entityId);
	            
	        	return Response.status(200).entity(output).build();
        	}
        	else
        	{
            	return Response.status(400).entity("Parameter not given").build();
        	}
		}
        else
        {
        	return Response.status(400).entity("Value required").build();
        }
    }
}
