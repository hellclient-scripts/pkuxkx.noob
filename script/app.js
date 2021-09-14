var App={}
App.Init=function(){
    App.Core={}
    App.Info={}
    App.API={}
    App.Alias={}
    App.Callbacks={}
    App.Listeners={}
    App.Data={}
    App.Mods={}
}
App.RegisterCallback=function(name,fn){
    App.Callbacks[name]=fn
}
App.ExecuteCallback=function(name,data){
    if (name){
        var fn=App.Callbacks[name]
        if (!fn){
            throw "回调["+name+"]无法找到"
        }
        return fn(data)
    }
}
App.Bind=function(event,callback){
    var listeners=App.Listeners[event]
    if (!listeners){
        listeners=[]
    }
    listeners.push(callback)
    App.Listeners[event]=listeners
}
App.Raise=function(event,data){
    var listeners=App.Listeners[event]
    if (listeners){
        listeners.forEach(function(fn){
            App.Callbacks[fn](data)
        })
    }
}

App.Load=function(name){
    eval(world.ReadFile(name),name)
}

App.Start=function(){
    App.Init()
    App.Load("param/param.js")
    App.Load("core/core.js")
    App.Load("info/info.js")
    App.Load("alias/alias.js")
    App.Raise("Ready")    
}
App.DumpData=function(){
    Dump(App.Data,true)
}
App.RegisterAPI=function(name,fm){
    App.API[name]=fm
}
Dump=function(data,silence){
    let output=JSON.stringify(data,null,2)
    if (!silence){
        world.Note(output)
    }
    return output
}
Debug=function(){
    Dump(App.Data)
}
Bound=function(){
    Dump(App.Listeners)
}
DumpPath=function(fr,to){
    if (typeof(to)=="string"){
        to=[to]
    }
    Dump(App.API.GetPath(fr,to))
}