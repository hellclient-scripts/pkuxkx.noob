(function(app){
    app.Core.OnResponse=function(name, output, wildcards){
        let cmd=wildcards[0]
        let data=wildcards[2]
        if (cmd){
            app.Raise("response.core."+cmd,data)
        }
    }
})(App)