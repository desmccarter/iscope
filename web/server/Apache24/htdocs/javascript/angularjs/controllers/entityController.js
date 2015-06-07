var app = angular.module('scopeapp', []);

app.controller('entityController', [ '$scope', 'entityservice', 'entityinstanceservice', '$document', function($scope, entityservice, entityinstanceservice, $document) {
    
    $scope.entities = entityservice.getAllEntities();
    
    $scope.entityInputs = entityinstanceservice.getAllEntityInputs();
    
    $scope.entityInstances =entityinstanceservice.getAllEntityInstances();
    
    $scope.entityLinks = [];
    
    $scope.testVar="test is a test";

    $scope.saveEntityInstances = function() {
        
        entityinstanceservice.saveEntityInstances();
    
    }
    
    $scope.scopeHasEntityInstances = function() {
    
        return $scope.entityInstances.length>0;
    }
    
    $scope.getAllEntities = function() {
        
        $scope.entities=entityservice.getAllEntities();
                
        return $scope.entities;
    }

    $scope.addEntityLink = function(id, fromX, fromY, toX, toY, angle, sourceId, targetId){
        
        var entityLink = null;
        
        for(var i=0; i<$scope.entityLinks.length; i++)
        {
            if(id==$scope.entityLinks[i].id)
            {
                entityLink=$scope.entityLinks[i]; break;
            }
        }
        
        if( entityLink == null )
        {
            entityLink =    
            {
                    id: id,
                    length: length,
                    fromX: fromX,
                    fromY: fromY,
                    toX: toX,
                    toY: toY,
                    sourceId: sourceId,
                    targetId: targetId,
                    angle: angle
            };
            
            $scope.entityLinks.push(entityLink);
        }
            
        return entityLink;
    }
    
    $scope.getEntityLinksBySourceId = function(sourceId){
        
        var entityLinks = [];
        
        for(var i=0; i<$scope.entityLinks.length; i++)
        {
            if(sourceId==$scope.entityLinks[i].sourceId)
            {
                entityLinks.push(entityLink=$scope.entityLinks[i]);
            }
        }
                    
        return entityLinks;
    }
    
    $scope.getEntityLinksByTargetId = function(targetId){
        
        var entityLink = [];
        
        for(var i=0; i<$scope.entityLinks.length; i++)
        {
            if(targetId==$scope.entityLinks[i].targetId )
            {
                entityLink.push($scope.entityLinks[i]);
            }
        }
            
        return entityLink;
    }
    
    $scope.getEntityInputsById = function(id){
        return entityinstanceservice.getEntityInputsById(id);
    }
    
    $scope.showSaveImage = function(id){

        return entityinstanceservice.showSaveImage(id);
    }

   $scope.expandDetailedEntityInstance = function(id){
       return entityinstanceservice.expandDetailedEntityInstance(id);
    }
    
    $scope.getEntityClass = function(id){
        
        return entityservice.getEntityById(id);
    }
    
    $scope.getEntityInputIndexById = function(id){        
        return entityinstanceservice.getEntityInputIndexById(id);
    }
    
    $scope.createEntityInstance = function(entityInstance){
        entityinstanceservice.createEntityInstance(entityInstance);
    }
    
    $scope.getEntityImage = function(id){
        return entityinstanceservice.getEntityImage(id);
    }

    $scope.getContainerRestrictions = function(containerName){

            var ret = null;

            for(var i=0; i<$scope.containerInfo.length; i++)
            {
                if($scope.containerInfo[i].name==containerName)
                {
                    ret = $scope.containerInfo[i]; break;
                }
            }

            return ret;
    }
    
    $scope.mouse = {x: 0, y: 0, event: null};

    document.addEventListener('mousemove', function(e){ 
            $scope.mouse.x = e.clientX || e.pageX; 
            $scope.mouse.y = e.clientY || e.pageY;
            $scope.mouse.event = e;
        
            //console.log("mouse: clientX/clientY("+$scope.mouse.x+","+$scope.mouse.y+")");
        }, false);
    
    $scope.containerInfo = 
    [
        { 
            name: 'operationlist',
            exitLeft: true,
            exitRight: false,
            exitTop: false,
            exitBottom: false
        },
        { 
            name: 'scope',
            exitLeft: false,
            exitRight: false,
            exitTop: false,
            exitBottom: false
        }
    ];
    
    $scope.entityIsInContainer = function(containerId, x, y, width, height){
    
        var container = document.getElementById(containerId).getBoundingClientRect();
    
        if( 
            ( (x>container.left) && ( x < (container.right-width) ) ) &&
            ( (y>container.top) && ( y < (container.bottom-height) ) )
        )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    $scope.instanceCount=0;
    
    $scope.processEntityPosition = function(entityId,elem,x, y, width, height){
        
        var containerId=null;
        
        for(var i=0; i<$scope.containerInfo.length; i++)
        {
            if($scope.entityIsInContainer($scope.containerInfo[i].name,x,y,width,height) )
            {
                containerId=$scope.containerInfo[i].name;
        
                var cr = $scope.getContainerRestrictions(containerId);
        
                var container = document.getElementById(containerId).getBoundingClientRect();

                if (container) {

                if ( (x < container.left) && !cr.exitLeft ) {
                    x = container.left;
                  } else if ( (x > container.right - width) && !cr.exitRight ) {
                    x = container.right - width;
                  }

                  if (y < container.top && !cr.exitTop) {
                    y = container.top;
                  } else if ( (y > container.bottom - height) && !cr.exitBottom) {
                    y = container.bottom - height;
                  }
                }
                
                break;
            }
        }
        
        var deleteSelfElement = false;
        
        if( (entityId!=null) && (containerId!=null) )
        {
            if(containerId == "scope")
            {   
                deleteSelfElement = true;
                
                var entityClass = $scope.getEntityClass(entityId);
                
                $scope.instanceCount++;
                
                var instanceId=entityClass.name+"Instance"+$scope.instanceCount
                
                $scope.createEntityInstance(
                    { 
                        container: containerId,
                        
                        viewData:
                        {
                            id: instanceId,
                            xPos : x,
                            yPos : y,
                            entityInputsExpanded: false,
                            minWidth: 100,
                            minHeight: 100,
                            maxWidth: 300,
                            maxHeight: 380,
                            currentWidth: 0,
                            currentHeight: 0,
                        },
                        
                        entityData : entityClass,
                        
                        entityLineTargetInstances : [],
                        
                        entityLineSourceInstances : []
                    });
                
                $scope.$apply();
            }  
        }
        
        var ret = 
            { 
                deleteSelfElement: deleteSelfElement,
                x: x,
                y: y,
                container: containerId
            };
        
        return ret;
    }
    
    $scope.createLineDiv = function(id,ax,ay,bx,by) {
        
        if(ay>by)
        {
            bx=ax+bx;  
            ax=bx-ax;
            bx=bx-ax;
            by=ay+by;  
            ay=by-ay;  
            by=by-ay;
        }

        var calc=Math.atan((ay-by)/(bx-ax));
        calc=calc*180/Math.PI;
        
        var length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
        
        var lineDiv = "<div id='"+id+"' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc  + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>";

        return lineDiv;
    }
    
}]);