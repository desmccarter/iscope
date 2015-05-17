app.service("entityservice",function(){
    
    var entities = [];
         
    this.getAllEntities = function() {

        if(entities.length==0)
        {
            $.ajax({
                url: "http://localhost:8080/eapi/getentity/all",
                dataType: 'jsonp',
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