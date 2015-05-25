# iscope

This is the iScope repository created by Des McCarter. There are two main folders:

1. web - the frontend section made up of javascript/angular/HTML5 scripts and files.
2. middletier - the entity API plus database code

Once cloned you will need to run your mongoDB server as follows:

1. cd iscope/database/mongodb
2. mongod --dbpath .

Next you need to run the HTTP server as follows:

1. cd iscope/web/server/Apache24/bin
2. httpd

Finally, you will need to run the entity server which, at the moment (I will need to create a script to run this formally), is in eapi/src/main/java/com/iscope/rest/Main.java.

To test the rest service then:

a. Insert some entity data into mongodb.
b. Do the following in the browser: http://localhost:8082/eapi/getentity/all
c. Do the following in the browers to test getting individual entity: http://localhost:8082/eapi/getentity/entity?id=database
