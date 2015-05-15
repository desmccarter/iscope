'use strict';

function dragEntity(ev, name) {    
    var id = ev.target.id;
    
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("divHtml", ev.target.innerHTML);
    ev.dataTransfer.setData("newinstancename", name);
    
    var imageSrc=null;
    
    $('#'+id+' img').each(function() {
        
        if(imageSrc==null)
        {
            imageSrc=$(this).attr('src');
        }
    });
    
    ev.dataTransfer.setData("imageSrc", imageSrc);
    ev.dataTransfer.effectAllowed = "copy";
}

function drop(ev, targetEventName) {
    
	var eventId = ev.target.id;
		
	// *** if we are dropping onto the canvas ...
	if (eventId === "scope") {
    
        ev.preventDefault();
        
        var div = document.createElement('div');
        var id=ev.dataTransfer.getData("id");
        
        div.id=id+"_Instance";
        div.className = "entityInstance";
        div.textContent = id;
        
        div.style.position = "absolute";
        
        var offset = $("#scope").offset();
        
        div.style.top = ev.pageY - offset.top;
        div.style.left = ev.pageX - offset.left;
        
        var img = document.createElement('img');
        
        img.setAttribute('src',ev.dataTransfer.getData("imageSrc"));
        img.setAttribute('class','entityInstanceImg');
        
        div.appendChild(img);
    
        ev.target.appendChild(div);
    }
}

function allowDrop(ev) {

	ev.preventDefault();
}