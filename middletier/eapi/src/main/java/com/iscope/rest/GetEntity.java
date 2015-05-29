package com.iscope.rest;

import java.net.UnknownHostException;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.iscope.db.EntityMongo;
import com.iscope.rest.entity.LocateEntity;
import com.iscope.rest.entity.LocateEntityEnum;

@Path("getentity")
public class GetEntity {
	
	private LocateEntity locateEntity=new LocateEntity();
    
    @GET
    @Path("/{parameter}")
    public Response responseMsg( @PathParam("parameter") String parameter,
            @DefaultValue("Not given") @QueryParam("id") String id) {
 
		try {
			locateEntity.setDB( new EntityMongo() );
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
    	
    	if( (parameter!=null) && (parameter.length()>0) )
    	{
    		String output="";
    		
    		if(parameter.equals("entity"))
    		{
    			output=locateEntity.get(LocateEntityEnum.SearchBySpecificName, id);
    		}
    		else
    		if(parameter.equals("all"))
    		{   
	            output=locateEntity.get(LocateEntityEnum.SearchAll, null);    			
    		}
    		
    		Response resp = Response.status(200).entity(output).build();    	       
    		
    		resp.getHeaders().add("Access-Control-Allow-Origin", "http://localhost");
    		
        	return resp;
    	}
    	else
    	{
        	return Response.status(400).entity("Parameter not given").build();
    	}
    }
}
