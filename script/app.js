var App={
    Core:{},
    Info:{},
    API:{},
    Callbacks:{},
    Listeners:{},
    Data:{}
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
App.Load("param/param.js")
App.Load("core/core.js")
App.Load("info/info.js")
App.Dump=function(){
    return JSON.stringify(App.Data,null,2)
}

Debug=function(){
    world.Note(App.Dump())
}
Bound=function(){
    world.Note(JSON.stringify(App.Listeners,null,2))
}