world.Note("加载pkuxkx.noob机器人")
onOpen=function (){

}

onClose=function (){

}

onConnected=function (){

}

onDisconnected=function (){

}

onAssist=function(){
    App.UIAssistantShow()
}

onBroadcast=function(msg,global,channel,global){
    
}
onBuffer=function(data){
    if (data.length==2){
        return data=="> "
    }
    if (data.length>20){
        if (data.substr(0,7)=="== 未完继续" && data.substr(-6,6)=="继续下一页)"){
            return true
        }
    }
    return false
}
var Modules=new function(){
    this.Loaded={}
    let cache={}
    this.Include=function(file){
        if (this.Loaded[file]){
            return cache[file]
        }
        cache[file]=eval(world.ReadFile(file),file)
        this.Loaded[file]=true
        return cache[file]
    }
}
var Include=function(file){
   return Modules.Include(file)
}
Include("util.js")
Include("app.js")
App.Start()