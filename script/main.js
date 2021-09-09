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

}

onBroadcast=function(msg,global,channel,global){
    
}
function Include(file){
    return eval(world.ReadFile(file),file)
}
Include("util.js")
Include("app.js")
App.Start()