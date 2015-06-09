app.directive("entityInstance", function($compile,$document){

    var idsRendered = [];
        
    function getTargetEntityInstance(sourceId, x, y, e){

        var ei = idsRendered;

        var targetEntityInstance = null;

        for(var i=0; i<ei.length; i++)
        {
            var tElem=$("#"+ei[i].viewData.id);

            var width=tElem.width();
            var height=tElem.height();

            if( (sourceId!=ei[i].viewData.id) && 
               (x>=ei[i].viewData.xPos) && (x<=(ei[i].viewData.xPos+width)) && 
               (y>=ei[i].viewData.yPos) && (y<=(ei[i].viewData.yPos+height)) )
            {
                targetEntityInstance=ei[i]; break;
            }
        }

        return targetEntityInstance;
    }
    
    var getViewData = function(id){
    
        var ret=null;
        
        for(var i=0; i<idsRendered.length; i++)
        {
            if(idsRendered[i].viewData.id==id)
            {
                ret=idsRendered[i].viewData; break;
            }
        }
        
        return ret;
    }
    
    var getRemovedInputsId = function(oldEntityInputs,newEntityInputs){
    
        var removedId=-1;
        
        for(var i=0; i<oldEntityInputs.length; i++)
        {
            found=false;
            
            for(var j=0; j<newEntityInputs.length; j++)
            {
                if(oldEntityInputs[i].id==newEntityInputs[j].id)
                {
                    found=true;
                    break;
                }
            }
            
            if(!found)
            {
                removedId=oldEntityInputs[i].id;
                break;
            }
        }
        
        return removedId;
    }
        
    var container=null;
    
    var instanceCount=0;
    
    var linkFunction = function(scope, element, attr){

        function getPythagLength(xstart,ystart,xto,yto){

            var len = Math.sqrt(
                ( xto - xstart) 
                * ( xto - xstart) 
                + ( yto - ystart) 
                * ( yto - ystart));

            return len;
        }

        function getEntityLinkAngle(xfrom, yfrom, xto, yto, len){

            var ang = 180 / 3.14 * Math.acos((yto - yfrom) / len);

            // Negate the angle if mouse pointer is to the right of the origin point
            if( (xto) > (xfrom))
                ang *= -1;

            return ang;
        }

        function rotateEntityLink(id, ang) {
            $('#'+id)
                .css('-webkit-transform', 'rotate(' + ang + 'deg)')
                .css('-moz-transform', 'rotate(' + ang + 'deg)')
                .css('-o-transform', 'rotate(' + ang + 'deg)')
                .css('-ms-transform', 'rotate(' + ang + 'deg)')
                .css('transform', 'rotate(' + ang + 'deg)');    
        }
        
        function moveEntityLink(entityLinkId, x, y, tox, toy) {

            var len = getPythagLength(x,y,tox,toy);

            $( "#"+entityLinkId ).css({
                position: 'absolute',
                height: len,
                top: y + 'px',
                left: x + 'px'
                });

            $( "#"+entityLinkId+"Point" ).css({
                position: 'absolute',
                top: ( y-($( "#"+entityLinkId+"Point" ).height()/2) ) + 'px',
                left: ( x-($( "#"+entityLinkId+"Point" ).width()/2) ) + 'px'
                });

            var ang = getEntityLinkAngle(x,y,tox,toy,len);

            rotateEntityLink(entityLinkId,ang);
        }
                
        function renderEntityLink(lineId, x, y, e){

            var len = Math.sqrt(
                ( (e.clientX-container.left) - x) 
                * ( (e.clientX-container.left) - x) 
                + ( (e.clientY-container.top) - y) 
                * ( (e.clientY-container.top) - y));

            $( "#"+lineId ).css({
                position: 'absolute',
                height: len,
                top: y + 'px',
                left: x + 'px'
                });

            var ang = 180 / 3.14 * Math.acos(((e.clientY-container.top) - y) / len);

            // Negate the angle if mouse pointer is to the right of the origin point
            if( (e.clientX-container.left) > (x))
                ang *= -1;

            $('#'+lineId)
                .css('-webkit-transform', 'rotate(' + ang + 'deg)')
                .css('-moz-transform', 'rotate(' + ang + 'deg)')
                .css('-o-transform', 'rotate(' + ang + 'deg)')
                .css('-ms-transform', 'rotate(' + ang + 'deg)')
                .css('transform', 'rotate(' + ang + 'deg)');
        }

        
        scope.$watchCollection('entityInstances', function(newInstances, oldInstances) {
     
            var getNewEntityInstance = function(newEntityInstances,oldEntityInstances){
        
                return newEntityInstances[newEntityInstances.length-1];
            }
            
            if( (newInstances.length>0) && (newInstances.length>oldInstances.length) )
            { 
                var i=0;
                var j=0;

                var entityInstance = getNewEntityInstance(newInstances,oldInstances);
                
                var imageSrc=entityInstance.entityData.src;

                var name=entityInstance.entityData.name;
                var xPos=entityInstance.viewData.xPos;
                var yPos=entityInstance.viewData.yPos;

                var viewData=entityInstance.viewData;

                var entityId=entityInstance.viewData.id;

                var entityInstanceId=entityInstance.viewData.id;
                                                       
                // *** scope name needs to be dynamic ...
                container = document.getElementById(entityInstance.container).getBoundingClientRect();
                
                var startElementY=scope.mouse.y-container.top;
                var startElementX=scope.mouse.x-container.left;

                var startLineX=0;
                var startLineY=0;
                
                var startMouseX=0;
                var startMouseY=0;
                
                var inputXOffset=50;
                var inputYOffset=100;
                
                var linkIncr=0;
                
                entityInstance.viewData.xPos=startElementX;
                entityInstance.viewData.yPos=startElementY;
                
                idsRendered.push(entityInstance);
                
                var newElem=null;
                
                var mainDivHtmlValue = 
                    "<div id=\""+entityInstanceId+"\" class=\"entityInstance\" ng-dblclick=\"expandDetailedEntityInstance(\'"+entityInstanceId+"\')\">"+
                        "<b>"+entityInstanceId+"</b><br><img src=\""+imageSrc+"\" class=\"entityImg\"/><br>"+
                    "</div>";

                element.append($compile(mainDivHtmlValue)(scope));
                
                var inputDivHtmlValue =
                    "<div ng-show=\"getEntityInputsById(\'"+entityId+"\')!=null\" id=\""+entityInstanceId+"Inputs\" class=\"entityInstanceInputs\">"+
                    
                        "<h5><b ng-show=\"getEntityInputsById(\'"+entityId+"\')!=null\">Fields</b></h5>"+
                        
                        "<entity-inputs id=\""+entityInstanceId+"\" inputs=\"getEntityInputsById(\'"+entityId+"\')\">"+
                        "</entity-inputs>"+
                                
                        "<br>"+
                    
                        "<h5><b ng-show=\"getEntityInputsById(\'"+entityId+"\')!=null\">Options</b></h5>"+
                        
                        "<div class=\"container\">"+
                            "<div class=\"btn-group\">"+
                                "<button type=\"button\" class=\"btn btn-primary btn-sm\">Connect</button>"+
                            "</div>"+
                        "</div>";
                    
                element.append($compile(inputDivHtmlValue)(scope));
                
                var dateOnMouseDown=null;
                var dateOnMouseMove=null;
                var timeDiff=0;
                var lineDivElem=null;
                var lineDivStartPointElem=null;

                function mmove(e) {

                    var mouseMoveDeltaX=(e.clientX-container.left)-startMouseX;
                    var mouseMoveDeltaY=(e.clientY-container.top)-startMouseY;

                    // *** if mouse has ACTUALLY moved ...
                    if( (mouseMoveDeltaX!=0) && (mouseMoveDeltaY!=0) )
                    {
                        i=startElementX+mouseMoveDeltaX;
                        j=startElementY+mouseMoveDeltaY;

                        if( dateOnMouseDown!= null )
                        {
                            if( (timeDiff==0) )
                            {
                                dateOnMouseMove = new Date();
                                timeDiff=(dateOnMouseMove-dateOnMouseDown)/1000;
                            }

                            if( timeDiff > 0.5 )
                            {                            
                                var lineId=entityInstance.viewData.id+"Line"+linkIncr; ++linkIncr;
                                var lineStartPointId=lineId+"Point";

                                if(lineDivElem==null)
                                {
                                    var lineHtml = 
                                        "<div id=\""+lineId+"\" class=\"linkline\"></div>";

                                    lineDivElem = $compile(lineHtml)(scope);

                                    element.append(lineDivElem);

                                    lineDivElem.id = lineId;

                                    var lineStartPointHtml = 
                                        "<div id=\""+lineStartPointId+"\" class=\"linklinepoint\"></div>";

                                    lineDivStartPointElem = $compile(lineStartPointHtml)(scope);

                                    lineDivStartPointElem.id = lineStartPointId;

                                    element.append(lineDivStartPointElem);

                                    $( "#"+lineDivStartPointElem.id ).css({
                                        position: 'absolute',
                                        top: ( startElementY-($( "#"+lineDivStartPointElem.id ).height()/2) ) + 'px',
                                        left: ( startElementX-($( "#"+lineDivStartPointElem.id ).width()/2) ) + 'px'
                                        });
                                }

                                renderEntityLink(lineDivElem.id,startLineX,startLineY,e);
                            }
                            else
                            {                               
                                entityInstance.viewData.yPos=j;
                                entityInstance.viewData.xPos=i;

                                /*if(entityInstance.entityLineTargetInstances.length>0)
                                {
                                    for(var x=0; x<entityInstance.entityLineTargetInstances.length; x++)
                                    {
                                        var lid=entityInstance.entityLineTargetInstances[x].lineId;
                                        var toX=entityInstance.entityLineTargetInstances[x].instance.viewData.xPos;
                                        var toY=entityInstance.entityLineTargetInstances[x].instance.viewData.yPos;

                                        moveEntityLink(lid,i,j,toX,toY);
                                    }
                                }*/
                                
                                var entityLinks=scope.getEntityLinksBySourceId(entityInstance.viewData.id);
                                
                                if(entityLinks!=null)
                                {
                                    for(var x=0; x<entityLinks.length; x++)
                                    {
                                        var el=entityLinks[x];
                                        
                                        var entityInstanceTarget=scope.getEntityInstance(el.targetId);
                                        
                                        var lid=el.linkId;
                                        var fromX=entityInstance.viewData.xPos;
                                        var fromY=entityInstance.viewData.yPos;
                                        
                                        moveEntityLink(lid,fromX,fromY,entityInstanceTarget.viewData.xPos,entityInstanceTarget.viewData.yPos);
                                    }
                                }
                                
                                entityLinks=scope.getEntityLinksByTargetId(entityInstance.viewData.id);
                                
                                if(entityLinks!=null)
                                {
                                    for(var x=0; x<entityLinks.length; x++)
                                    {
                                        var el=entityLinks[x];
                                        
                                        var entityInstanceTarget=scope.getEntityInstance(el.sourceId);
                                        
                                        var lid=el.linkId;
                                        var toX=entityInstance.viewData.xPos;
                                        var toY=entityInstance.viewData.yPos;
                                        
                                        moveEntityLink(lid,entityInstanceTarget.viewData.xPos,entityInstanceTarget.viewData.yPos,toX,toY);
                                    }
                                }
                                
                                /*if(entityInstance.entityLineSourceInstances.length>0)
                                {
                                    for(var x=0; x<entityInstance.entityLineSourceInstances.length; x++)
                                    {  
                                        var lid=entityInstance.entityLineSourceInstances[x].lineId;
                                        var fromX=entityInstance.entityLineSourceInstances[x].instance.viewData.xPos;
                                        var fromY=entityInstance.entityLineSourceInstances[x].instance.viewData.yPos;

                                        moveEntityLink(lid,fromX,fromY,i,j);
                                    }
                                }*/
                                                                
                                // *** move entity instance ...
                                $( "#"+entityInstance.viewData.id ).css({
                                    position: 'absolute',
                                    top: entityInstance.viewData.yPos + 'px',
                                    left: entityInstance.viewData.xPos + 'px'
                                });

                                $( "#"+entityInstance.viewData.id+"Inputs" ).css({
                                    position: 'absolute',
                                    top: (entityInstance.viewData.yPos+inputYOffset) + 'px',
                                    left: (entityInstance.viewData.xPos+inputXOffset) + 'px'
                                });
                            }            
                        }
                    }
                }

                function mup(e) {
                    
                    var mouseMoveDeltaX=(e.clientX-container.left)-startMouseX;
                    var mouseMoveDeltaY=(e.clientY-container.top)-startMouseY;
                    
                    if(timeDiff<=0.5)
                    {                        
                        i=startElementX+((e.clientX-container.left)-startMouseX);
                        j=startElementY+((e.clientY-container.top)-startMouseY);
                    
                        startElementX=i;
                        startElementY=j;
                    
                        entityInstance.viewData.yPos=j;
                        entityInstance.viewData.xPos=i;
                    }
                    else
                    if(lineDivElem!=null)
                    {   
                        var targetEntityInstance = 
                            getTargetEntityInstance(entityInstance.id,(e.clientX-container.left),(e.clientY-container.top),e);
                        
                        if(targetEntityInstance!=null)
                        {
                            scope.linkEntityInstances(entityInstance.viewData.id,targetEntityInstance.viewData.id,lineDivElem.id);
                            
                            /*entityInstance.entityLineTargetInstances.push(
                                {
                                    lineId: lineDivElem.id,
                                    instance: targetEntityInstance
                                }
                            );
                            
                            targetEntityInstance.entityLineSourceInstances.push(
                                {
                                    lineId: lineDivElem.id,
                                    instance: entityInstance
                                }
                            );*/
                                                           
                            moveEntityLink(
                                lineDivElem.id,
                                entityInstance.viewData.xPos,
                                entityInstance.viewData.yPos,
                                targetEntityInstance.viewData.xPos,
                                targetEntityInstance.viewData.yPos);               
                        }
                        else
                        {
                            $("#"+lineDivStartPointElem.id).remove();
                            $("#"+lineDivElem.id).remove();
                        }
                    }
                    
                    $document.unbind('mousemove', mmove);
                    $document.unbind('mouseup', mup);
                    
                    dateOnMouseDown=null;
                    timeDiff=0;
                    lineDivElem=null;
                  }

                $( "#"+entityInstance.viewData.id ).on( "mousedown", function(e) {
                    e.preventDefault();
                    
                    dateOnMouseDown = new Date();
                    dateOnMouseMove = null;

                    timeDiff=0;
                    lineDivElem=null;
                    lineDivStartPointElem=null;
                    
                    startMouseX=e.clientX-container.left;
                    startMouseY=e.clientY-container.top;

                    startLineX=startElementX;
                    startLineY=startElementY;
                    
                    $document.on('mousemove', mmove);
                    $document.on('mouseup', mup);
                });
                
                var width=viewData.minWidth;
                var height=viewData.minHeight;
                
                viewData.currentWidth=width;
                viewData.currentHeight=height;
                            
                $("#"+entityInstanceId).css(
                    {
                        top: entityInstance.viewData.yPos, 
                        left: entityInstance.viewData.xPos, 
                        position:'absolute', 
                        height: height, 
                        width: width
                    });
                
                $("#"+entityInstanceId+"Inputs").css(
                    {
                        top: entityInstance.viewData.yPos+inputYOffset, 
                        left: entityInstance.viewData.xPos+inputXOffset, 
                        position:'absolute', 
                        height: height, 
                        width: width
                    });
            }
        });
        
        scope.$watchCollection('entityInputs', function(newEntityInputs, oldEntityInputs) {
          
            if( (newEntityInputs.length>0) && (newEntityInputs.length>oldEntityInputs.length) )
            {
                var container = document.getElementById("scope").getBoundingClientRect();
            
                var yPositionInContainer=scope.mouse.y-container.top;
                var xPositionInContainer=scope.mouse.x-container.left;

                var id=newEntityInputs[newEntityInputs.length-1].id;
                var data=getViewData(id);
                
                data.currentHeight=data.maxHeight;
                data.currentWidth=data.maxWidth;
          
                data.yPos=yPositionInContainer;
                data.xPos=xPositionInContainer;
            
                $("#"+id).css(
                    {height: data.currentHeight, width:  data.currentWidth}
                );
            }
            else
                if((oldEntityInputs.length>0) && (oldEntityInputs.length>newEntityInputs.length))
                {
                
                    var container = document.getElementById("scope").getBoundingClientRect();
            
                    var yPositionInContainer=scope.mouse.y-container.top;
                    var xPositionInContainer=scope.mouse.x-container.left;
                    
                    var id=getRemovedInputsId(oldEntityInputs,newEntityInputs);
                    var data=getViewData(id);
                    
                    data.currentHeight=data.minHeight;
                    data.currentWidth=data.minWidth;
           
                    data.yPos=yPositionInContainer;
                    data.xPos=xPositionInContainer;
                    
                    $("#"+id).css(
                        {height: data.currentHeight, width:  data.currentWidth}
                    );
                }
        });
    }
    
return {
    restrict: "A",
    link: linkFunction
}

});
