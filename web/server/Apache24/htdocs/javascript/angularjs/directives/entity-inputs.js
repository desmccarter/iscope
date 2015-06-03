app.directive("entityInputs", function($compile){

    var linkFunction = function(scope, element, attr){
        
        var htmlValue = 
                    "<div ng-repeat=\"input in inputs(id).inputs\" class=\"input-group\">"+
                        "<input class=\"form-control\" placeholder=\"{{input.name}}\" aria-describedby=\"basic-addon1\" id=\"{{input.name}}_input\" type=\'text\' ng-model=\"input.value\"></input>"+
                    "</div>"; 

        /*
        <div class="input-group">
  <span class="input-group-addon" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
</div>
        
        */
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
