app.service("entityservice",function(){
    
    var entities = [];
         
    this.getAllEntities = function() {

        if(entities.length==0)
        {
            $.ajax({
                url: "http://localhost:8080/eapi/getentity/all",
                dataType:"jsonp",
                xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
                },
                success: function(data) {
                    entities=data;
                }
            });
        }
        
        return entities;
    }
    
    this.getEntityById = function(id){
        
        var ret=null;
        
        for(var i=0; i<entities.length; i++)
        {
            if( entities[i].name == id )
            {
                ret=entities[i]; break;
            }
        }
        
        return ret;
    }
});