var App={}
App.Init=function(){
    App.Core={}
    App.Info={}
    App.API={}
    App.Callbacks={}
    App.Listeners={}
    App.Data={}
    App.Mods={}
}
App.RegisterCallback=function(name,fn){
    App.Callbacks[name]=fn
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
    App.Raise("ready")    
}
App.Dump=function(){
    return JSON.stringify(App.Data,null,2)
}
App.RegisterAPI=function(name,fm){
    App.API[name]=fm
}
Debug=function(){
    world.Note(App.Dump())
}
Bound=function(){
    world.Note(JSON.stringify(App.Listeners,null,2))
}
DumpPath=function(fr,to){
    if (typeof(to)=="string"){
        to=[to]
    }
    world.Note(JSON.stringify(App.API.GetPath(fr,to),null,2))
}