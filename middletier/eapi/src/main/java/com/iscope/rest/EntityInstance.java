package com.iscope.rest;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/entityinstance")
public class EntityInstance {

	@POST
	@Path("/save")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(InputStream inputData){
		
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
			
		}
		
		Response ret=null;
		
		return ret;
	}
}
