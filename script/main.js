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
function Include(file){
    return eval(world.ReadFile(file),file)
}
Include("util.js")
Include("app.js")
App.Start()