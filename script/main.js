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
    return data=="> "
}
function Include(file){
    return eval(world.ReadFile(file),file)
}
Include("util.js")
Include("app.js")
App.Start()