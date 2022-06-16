"use strict";
world.Note("加载pkuxkx.noob机器人")
var onOpen=function (){

}

var onClose=function (){

}

var onConnected=function (){
    App.Raise("Connected")
}

var onDisconnected=function (){

}

var onAssist=function(){
    App.UIAssistantShow()
}

var onBroadcast=function(msg,global,channel){
    
}
var onResponse=function(msgtype,id,data){
    App.onResponse(msgtype,id,data)
}
var onBuffer=function(data){
    if (data.length==2){
        //提示符
        return data=="> "
    }
    if (data.length==11){
        if (data[0].charCodeAt()==27&&data.slice(1,7)=="[1;36m"&&data.slice(-2)==".."){
            //武当诵经
            return true
        }
        if (data[0].charCodeAt()==27&&data.slice(1,9)=="[2;37;0m"&&data.slice(-2)=="> "){
            //白色提示符
            return true
        }
        return false
    }

    if (data.length==20){
        if (data[9].charCodeAt()==27&& data.slice(10,16)=="[1;36m"&&data[0].charCodeAt()==27&&data.slice(1,9)=="[2;37;0m"&&data.slice(-2)==".."){
                //白色提示符+诵经
                return true
        }
    }
    if (data.length>20){
        if (data.substr(0,7)=="== 未完继续" && data.substr(-6,6)=="继续下一页)"){
            return true
        }
    }
    return false
}
var onHUDClick=function(x,y){
    Dump({"x":x,y:y})
}
var loader=function(){
    this.Loaded={}
    let cache={}
    this.reader=world.ReadFile
    
    this.Include=function(file){
        if (this.Loaded[file]){
            return cache[file]
        }
        cache[file]=eval(this.reader(file),file)
        this.Loaded[file]=true
        return cache[file]
    }
}
var Modules=new loader()
var Mod=new loader()
Mod.reader=world.ReadModFile
var Include=function(file){
   return Modules.Include(file)
}
Include("util.js")
Include("app.js")
App.Start()