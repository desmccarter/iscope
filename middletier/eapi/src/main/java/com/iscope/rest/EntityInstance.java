package com.iscope.rest;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("entityinstance")
public class EntityInstance {

	@POST
	@Path("/saveentityinstance")
	@Consumes(MediaType.APPLICATION_JSON)
	//@Produces(MediaType.APPLICATION_JSON)
	public Response save(InputStream inputData){
		
		System.out.println("test");
		
		StringBuilder builder = new StringBuilder();
		
		try {
			
			BufferedReader br = new BufferedReader(new InputStreamReader(inputData));
			
			String line = null;
			
			while( (line=br.readLine()) != null ){
				builder.append(line);
			}
			
			System.out.println("data="+builder.toString());
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		
		Response resp = Response.status(200).entity("{ \"done\" : \"done\" }").build();
		
		System.out.println("done response");
	
		return resp;
		
		//resp.getHeaders().add("Access-Control-Allow-Origin", "http://localhost");
	}
}
