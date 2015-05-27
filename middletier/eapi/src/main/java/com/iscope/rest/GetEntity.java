package com.iscope.rest;

import java.net.UnknownHostException;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.iscope.rest.entity.ProcessAll;
import com.iscope.rest.entity.ProcessEntity;

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
    			output=ProcessEntity.get(id);
    		}
    		else
    		if(parameter.equals("all"))
    		{   
	            output=ProcessAll.get();    			
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
