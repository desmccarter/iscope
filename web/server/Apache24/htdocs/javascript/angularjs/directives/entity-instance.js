app.directive("entityInstance", function($compile,$document){

    var idsRendered = [];
        
    var getViewData = function(id){
    
        var ret=null;
        
        for(var i=0; i<idsRendered.length; i++)
        {
            if(idsRendered[i].id==id)
            {
                ret=idsRendered[i].instance.viewData; break;
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
                
                var entityPositionData =
                    {
                        id: entityInstanceId,
                        xPositionInContainer: startElementX,
                        yPositionInContainer: startElementY,
                        startMouseX: 0,
                        startMouseY: 0,
                        instance: entityInstance
                    };

                idsRendered.push(entityPositionData);
                
                var newElem=null;
                
                var mainDivHtmlValue = 
                    "<div id=\""+entityInstanceId+"\" class=\"entityInstance\" ng-dblclick=\"expandDetailedEntityInstance(\'"+entityInstanceId+"\')\">"+
                        "<p>"+entityInstanceId+"</p><br><img src=\""+imageSrc+"\" class=\"entityImg\"/><br>"+
                    "</div>";

                var mainDivElem = $compile(mainDivHtmlValue)(scope);

                element.append(mainDivElem);
                
                var inputDivHtmlValue =
                    "<div ng-show=\"getEntityInputsById(\'"+entityId+"\')!=null\" id=\""+entityInstanceId+"Inputs\" class=\"entityInstanceInputs\">"+
                        "<entity-inputs id=\""+entityInstanceId+"\" inputs=\"getEntityInputsById(\'"+entityId+"\')\"></entity-inputs><br>"+
                        "<img ng-show=\"(showSaveImage(\'"+entityInstanceId+"\'))\" src=\"images/icons/save.ico\" height=\"20\" width=\"20\">"+
                    "</div>"; 

                var inputDivElem = $compile(inputDivHtmlValue)(scope);

                element.append(inputDivElem);
                
                var mouseMoved=false;
                
                var dateOnMouseDown=null;
                var dateOnMouseMove=null;
                var timeDiff=0;
                var lineDivElem=null;
                var lineDivStartPointElem=null;
                var angle=0;

                function getTargetEntityInstance(sourceId, x, y, e){
                    
                    var ei = idsRendered;
                    
                    var targetEntityInstance = null;
                    
                    for(var i=0; i<ei.length; i++)
                    {
                        var tElem=$("#"+ei[i].id);
                        
                        var width=tElem.width();
                        var height=tElem.height();
                        
                        if( (sourceId!=ei[i].id) && 
                           (x>=ei[i].xPositionInContainer) && (x<=(ei[i].xPositionInContainer+width)) && 
                           (y>=ei[i].yPositionInContainer) && (y<=(ei[i].yPositionInContainer+height)) )
                        {
                            targetEntityInstance=ei[i]; break;
                        }
                    }
                    
                    return targetEntityInstance;
                }
                
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
                                var lineId=entityInstanceId+"Line"+linkIncr; ++linkIncr;
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
                                entityPositionData.yPositionInContainer=entityPositionData.instance.viewData.yPos=j;
                                entityPositionData.xPositionInContainer=entityPositionData.instance.viewData.xPos=i;

                                var elinks=scope.getEntityLinksBySourceId(entityInstanceId);

                                if(elinks.length>0)
                                {
                                    for(var x=0; x<elinks.length; x++)
                                    {
                                        var entityLink=elinks[x];

                                        moveEntityLink(entityLink.id,i,j,entityLink.toX,entityLink.toY);

                                        entityLink.fromX=i;
                                        entityLink.fromY=j;
                                    }
                                }

                                elinks=scope.getEntityLinksByTargetId(entityInstanceId);

                                if(elinks.length>0)
                                {       
                                    for(var x=0; x<elinks.length; x++)
                                    {
                                        var elink=elinks[x];

                                        moveEntityLink(elink.id,
                                                   elink.fromX,
                                                   elink.fromY,i,j);

                                        elink.toX=i;
                                        elink.toY=j;
                                    }
                                }

                                // *** move entity instance ...
                                $( "#"+entityInstanceId ).css({
                                position: 'absolute',
                                top: entityPositionData.yPositionInContainer + 'px',
                                left: entityPositionData.xPositionInContainer + 'px'
                                });

                                $( "#"+entityInstanceId+"Inputs" ).css({
                                position: 'absolute',
                                top: (entityPositionData.yPositionInContainer+inputYOffset) + 'px',
                                left: (entityPositionData.xPositionInContainer+inputXOffset) + 'px'
                                });
                            }            
                        }
                    }
                }

                function mup(e) {
                    
                    if(timeDiff<=0.5)
                    {                        
                        i=startElementX+((e.clientX-container.left)-startMouseX);
                        j=startElementY+((e.clientY-container.top)-startMouseY);
                    
                        startElementX=i;
                        startElementY=j;
                    
                        entityPositionData.yPositionInContainer=entityPositionData.instance.viewData.yPos=j;
                        entityPositionData.xPositionInContainer=entityPositionData.instance.viewData.xPos=i;
                    
                        $document.unbind('mousemove', mmove);
                        $document.unbind('mouseup', mup);
                    }
                    else
                    if(lineDivElem!=null)
                    {   
                        var targetEntityInstance = 
                            getTargetEntityInstance(entityInstanceId,(e.clientX-container.left),(e.clientY-container.top),e);
                        
                        if(targetEntityInstance!=null)
                        {
                            entityInstance.entityLineTargetInstances.push(targetEntityInstance);
                            targetEntityInstance.instance.entityLineSourceInstances.push(entityInstance);
                            
                            console.log("source="+entityInstance.viewData.id+" target="+targetEntityInstance.instance.viewData.id);
                            
                            var elink = scope.addEntityLink(lineDivElem.id, 
                                            startLineX, 
                                            startLineY, 
                                            targetEntityInstance.xPositionInContainer,
                                            targetEntityInstance.yPositionInContainer,
                                            angle,
                                            entityInstanceId,
                                            targetEntityInstance.instance.viewData.id
                                           );
                            
                            moveEntityLink(elink.id,elink.fromX,elink.fromY,elink.toX,elink.toY);
                                               
                        }
                        else
                        {
                            $("#"+lineDivStartPointElem.id).remove();
                            $("#"+lineDivElem.id).remove();
                        }
                    }
                    
                    dateOnMouseDown=null;
                    timeDiff=0;
                    lineDivElem=null;
                  }

                $( "#"+entityInstanceId ).on( "mousedown", function(e) {
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
            
                viewData.yPos=mainDivElem.offsetTop=entityPositionData.yPositionInContainer;
                viewData.xPos=mainDivElem.offsetLeft=entityPositionData.xPositionInContainer;
                
                $("#"+entityInstanceId).css(
                    {top: viewData.yPos, left: viewData.xPos, position:'absolute', height: height, width: width});
                
                $("#"+entityInstanceId+"Inputs").css(
                    {top: viewData.yPos+inputYOffset, left: viewData.xPos+inputXOffset, position:'absolute', height: height, width: width});
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
            
                $("#").css(
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
