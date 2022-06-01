(function(App){
    App.Core.OnResponse=function(name, output, wildcards){
        let type=wildcards[1]
        let cmd=wildcards[2]
        let data=wildcards[4]
        if (cmd){
            App.Raise("Response."+type+"."+cmd,data)
        }
    }
    App.ResponseCmd=function(type,name,value){
        let cmd="response "+type + " "+name
        if (value){
            cmd=cmd+" " +value
        }
        return cmd
    }
    App.Response=function(type,name,value){
        App.Send(App.ResponseCmd(type,name,value))
    }
})(App)