app.directive("entityInputs", function($compile){

    var linkFunction = function(scope, element, attr){
        
        var htmlValue = 
                    "<div ng-repeat=\"input in inputs(id).inputs\">"+
                        "<b><br>{{input.name}}</b>:<br><input id=\"{{input.name}}_input\" type=\'text\' ng-model=\"input.value\"></input>"+
                    "</div>"; 

        var newElem = $compile(htmlValue)(scope);

        element.append(newElem);
    }
    
return {
    
    restrict: "E",
    
    link: linkFunction,
    
    scope:
        {
            inputs: '&'
        }
}

});
