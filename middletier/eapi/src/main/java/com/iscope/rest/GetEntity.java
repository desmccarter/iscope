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
 
    	if( (parameter!=null) && (parameter.length()>0) )
    	{
    		String output="";
    		
    		if(parameter.equals("entity"))
    		{
	    	    if( (id!=null) && (id.length()>0) )
	    		{
		        	String entityId=id;
		        	    
		            EntityDB entityDb=null;
		            
		            try {
						entityDb = new EntityDB();
					} catch (UnknownHostException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		            
		            output=entityDb.getEntityByName(entityId);
	    		}
    		}
    		else
    		if(parameter.equals("all"))
    		{
	            EntityDB entityDb=null;
	            
	            try {
					entityDb = new EntityDB();
				} catch (UnknownHostException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	            
	            output=entityDb.getAllEntities();    			
    		}
    		
    		Response resp = Response.status(200).entity(output).build();
    		
    		resp.getHeaders().add("Allow-Control-Allow-Origin","http://localhost");
    		
        	return resp;
    	}
    	else
    	{
        	return Response.status(400).entity("Parameter not given").build();
    	}
    }
}
