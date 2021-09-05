var App={
    Core:{},
    API:{},
    Data:{}
}

App.Load=function(name){
    eval(world.ReadFile(name),name)
}

App.Load("core/core.js")
App.Dump=function(){
    return JSON.stringify(App.Data,null,2)
}

Debug=function(){
    world.Note(App.Dump())
}