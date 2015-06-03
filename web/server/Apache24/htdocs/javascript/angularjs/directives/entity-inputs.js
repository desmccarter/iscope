app.directive("entityInputs", function($compile){

    var linkFunction = function(scope, element, attr){
        
        var htmlValue = 
                    "<div ng-repeat=\"input in inputs(id).inputs\">"+
                        "<div class=\"container\">"+
                            "<div class=\"col-xs-2\">"+
                                "<input class=\"form-control input-sm\" placeholder=\"{{input.name}}\" id=\"{{input.name}}_input\" type=\'text\' ng-model=\"input.value\">"+
                                "</input>"+
                            "</div>"+
                        "</div>"+
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
