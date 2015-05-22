app.service("entityservice",function(){

    var restApi = "http://localhost:8081/eapi";
    
    var entities = [];
         
    this.getAllEntities = function() {

        if(entities.length==0)
        {
            $.ajax({
                url: restApi+"/getentity/all",
                dataType: 'json',
                async: false,
                success: function(data) {
                    entities=data;
                }        
            });
        }
   
        return entities;
    }
    
    this.getEntityById = function(id){
        
        var ret=null;
        
        for(var i=0; i<this.getAllEntities().length; i++)
        {
            var entity = this.getAllEntities()[i];
            
            if( entity.name == id )
            {
                ret=entity; break;
            }
        }
        
        return ret;
    }
});