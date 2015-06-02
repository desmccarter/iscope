app.service("entityinstanceservice", [ 'entityservice', function(entityservice) {

var entityInstances = [];
var entityInputs = [];
    
    this.getEntityInputsById = function(id){

        var einputs = null;

        for(var i=0; i<entityInputs.length; i++)
        {
            if(entityInputs[i].id==id)
            {
                einputs=entityInputs[i]; break;
            }
        }

        return einputs;
    }

   this.expandDetailedEntityInstance = function(id){

        for(var i=0; i<entityInstances.length; i++)
        {
            if(entityInstances[i].viewData.id==id)
            {
                var viewData=entityInstances[i].viewData;
                var entityData=entityInstances[i].entityData;
                
                if(viewData.entityInputsExpanded)
                {
                    entityInputs.splice(this.getEntityInputIndexById(id),1);
                    
                    viewData.entityInputsExpanded=false;
                }
                else
                {
                    entityInputs.push(
                        { 
                            id: id, 
                            inputs: angular.copy(entityData.inputs) 
                        });
                    
                    viewData.entityInputsExpanded=true;
                }
                
                break;
            }
        }
    }
   
    this.getEntityClass = function(id){
        
        return entityservice.getEntityById(id);
    }
    
    this.getEntityInputIndexById = function(id){
        
        var ret=-1;
        
        for(var i=0; i<entityInputs.length; i++)
        {
            if( entityInputs[i].id == id )
            {
                ret=i; break;
            }
        }
        
        return ret;
    }
    
    this.createEntityInstance = function(entityInstance){
        
        //var copyOfInstance = angular.copy(entityInstance);
        
        entityInstances.push(entityInstance);
    }
    
    this.getEntityImage = function(id){

        var entityImage=null;
        
        for(var i=0; i<entityInstances.length; i++)
        {
            var viewData=entityInstances[i].viewData;
            var entityData=entityInstances[i].entityData;
            
            if(entityInstances[i].viewData.id==id)
            {    
                entityImage = entityInstances[i].entityData.src;
                break;
            }
        }
        
        return entityImage;
    }
    
    this.showSaveImage = function(id){
        return this.getEntityInputsById(id) != null;
    }
    
    this.getAllEntityInputs = function(){
        return entityInputs;
    }
    
    this.getAllEntityInstances = function(){
        return entityInstances;
    }
}]);