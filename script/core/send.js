(function(app){
    var _linesre = new RegExp("[^;]+", "g");
    var _groupre=new RegExp("[;\n]", "g");
    var _flags=".^"
        app.Commands={}
    app.RegisterCommand=function(name,callback){
        app.Commands[name]=callback
    }
    app.Send=function(str,grouped){

    }

})(App)