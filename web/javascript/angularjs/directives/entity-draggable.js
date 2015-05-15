app.directive("entityDraggable", function($document,$interpolate,$compile) {
    
    var entityInstancePos = 0;
    var entityInstanceId = null;
    
    return {
        restrict: 'A',
    
        link: function(scope, elem, attr)
        {
            var startX, startY, x = 0, y = 0,
            start, stop, drag, container;
            
            function createEntityInstanceDiv(entityId,entityElement){
                
                var entityInstanceClass = entityElement.getAttribute("class");
                var entityInstanceInnerHtml = entityElement.innerHTML;
                                
                function createAttribute(attrName, attrValue, elemContainingAttr)
                {
                    var attribute = document.createAttribute(attrName);
                
                    if(attrValue!=null)
                    {
                        attribute.value = attrValue;
                    }
                    
                    elemContainingAttr.setAttributeNode(attribute);
                }

                var div = document.createElement("div");
                
                createAttribute("id", entityId+"Clone", div);
                createAttribute("class", entityElement.getAttribute("class"), div);
                createAttribute("entity-draggable", null, div);
                           
                var divHtml = $interpolate(entityInstanceInnerHtml)(scope);

                div.innerHTML = divHtml;
                div.offsetHeight = entityElement.offsetHeight;
                div.offsetWidth = entityElement.offsetWidth;

                $compile(divHtml)(scope);
                                
                return div;
            }
            
            function cloneEntity(entityId, entityElement, originalOffsetLeft, originalOffsetTop) {
                
                var startXPos=originalOffsetLeft;
                var startYPos=originalOffsetTop;
                
                var mouseX=0;
                var mouseY=0;
                
                var i=0;
                var j=0;

                var width  = entityElement.offsetWidth;
                var height = entityElement.offsetHeight;
                
                var mouseMoveClone=false;
                
                var clonedEntity = null;
                
                entityElement.id=entityId;
                
                function mmove(e) {
                    
                    var mouseDiffX=e.clientX-mouseX;
                    var mouseDiffY=e.clientY-mouseY;
 
                    if(!mouseMoveClone)
                    {
                        clonedEntity = createEntityInstanceDiv(entityId,entityElement);
                            
                        clonedEntity.offsetLeft=originalOffsetLeft;
                        clonedEntity.offsetTop=originalOffsetTop;
                        
                        entityElement.parentElement.appendChild(clonedEntity);
                        
                        mouseMoveClone=true;
                    }
                    
                    j = startYPos+mouseDiffY;
                    i = startXPos+mouseDiffX;
                
                    var processedPosition = scope.processEntityPosition(null,null,i,j,width,height);
              
                    i = processedPosition.x;
                    j = processedPosition.y;
              
                    $( "#"+entityId ).css({
                      position: 'absolute',
                      top: j + 'px',
                      left:  i + 'px'
                    });
                  }
                
                function mup(e) {
                    
                    var processedPosition = scope.processEntityPosition(entityId,entityElement,i,j,width,height);
            
                    i = processedPosition.x;
                    j = processedPosition.y;

                    startXPos=i;
                    startYPos=j;

                    if(processedPosition.deleteSelfElement || mouseMoveClone)
                    {
                        entityElement.parentElement.removeChild(entityElement);
                        entityElement.id="deleted";
                        clonedEntity.id=entityId;
                        entityElement=clonedEntity;
                        clonedEntity=null;
                    }
              
                    mouseMoveClone=false;
                    
                    $document.unbind('mousemove', mmove);
                    $document.unbind('mouseup', mup);
                  }
                
                $( "body" ).on( "mousedown","#"+entityId, function(e) {
                    e.preventDefault();
                    
                    console.log("mousedown()");
                    
                    mouseX=e.clientX;
                    mouseY=e.clientY;
                    
                    startXPos = entityElement.offsetLeft;
                    startYPos = entityElement.offsetTop;
                    
                    mouseMoveClone=false;
                    
                    clonedEntity=null;
                    
                    $document.on('mousemove', mmove);
                    $document.on('mouseup', mup);
                });
            }

            var entityId=$interpolate(elem[0].id)(scope);
            
            console.log("entity id="+elem[0].parentElement.className);
            
            cloneEntity(entityId,elem[0],elem[0].offsetLeft,elem[0].offsetTop);
        }
    }
});