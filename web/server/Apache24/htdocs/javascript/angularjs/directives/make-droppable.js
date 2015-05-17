app.directive('makeDroppable', function() {
    
    var instanceCount = 1;
    
    return {
        //scope: {},
        link: function(scope, element) {
            // again we need the native object
            var el = element[0];
            
            el.addEventListener(
            'dragover',
            function(e) {
                e.dataTransfer.dropEffect = 'move';
                // allows us to drop
                if (e.preventDefault) e.preventDefault();
                this.classList.add('over');
            return false;
            },
            false
            );
            
            el.addEventListener(
            'dragenter',
                function(e) {
                this.classList.add('over');
                return false;
            },
            false
            );

            el.addEventListener(
            'dragleave',
                function(e) {
                this.classList.remove('over');
                return false;
                },
            false
            );
            
            el.addEventListener(
            'drop',
            function(e) {
                
                // Stops some browsers from redirecting.
                if (e.stopPropagation) e.stopPropagation();

                this.classList.remove('over');
          
                var imageSrc=e.dataTransfer.getData("imageSrc");
                var id=e.dataTransfer.getData("id");
                
                var entityClass = scope.getEntityClass(id);

                var offset = $("#scope").offset();

                var yPos = e.pageY - offset.top;
                var xPos = e.pageX - offset.left;
                                
                scope.createEntityInstance(
                    { 
                        viewData:
                        {
                            id: entityClass.name+"_Instance_"+(instanceCount++),
                            xPos : xPos,
                            yPos : yPos,
                            entityInputsExpanded: false,
                            minWidth: 100,
                            minHeight: 100,
                            maxWidth: 300,
                            maxHeight: 300,
                            currentWidth: 0,
                            currentHeight: 0,
                        },
                        
                        entityData : entityClass 
                    });
                
                scope.$apply();
                
                return false;
            },
            false
            );
        }
    }
});