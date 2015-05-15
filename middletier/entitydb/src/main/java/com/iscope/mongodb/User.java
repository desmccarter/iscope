package com.iscope.mongodb;

public class User {

	private int id;
	private String name;
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	private static int nextId=30;
	
	private static int getNextId(){
		return nextId++;
	}
	
	public static User createUser() {
		
		User user = new User();
		
		int id=getNextId();
		
		user.setId(id);
		
		user.name="Joe Bloggs "+id;
		
		return user;
	}
}
