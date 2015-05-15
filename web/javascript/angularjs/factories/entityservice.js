app.service("entityservice",function(){
    
    var entities = [
        { 
            name: 'database', 
            src: 'images/icons/database.jpg', 
            classType: 'classdatabase',
            
            inputs: [
            {
                name: "url",
                value: ""
            },    
            {
                name: "username",
                value: ""
            },
            {
                name: "password",
                value: ""
            },
            {
                name: "database type",
                value: "SQL Server"
            }]
        },
        { 
            name: 'website', 
            src: 'images/icons/web.jpg', 
            classType: 'classwebsite',
        },
        
        { name: 'queue', src: 'images/icons/queue.png' , classType: 'classqueue' },
        
        { name: 'file', src: 'images/icons/fileserver.png' , classType: 'classfile' },
        
        { name: 'api', src: 'images/icons/api.png' , classType: 'classapi'},
        
        { name: 'service', src: 'images/icons/service.png' , classType: 'classservice' }
    ];
         
    this.getAllEntities = function() {

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