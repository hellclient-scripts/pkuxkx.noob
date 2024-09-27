"use strict";
var DebugLevel=0
world.Note("加载pkuxkx.noob机器人")
var onOpen = function () {

}

var onClose = function () {

}

var onConnected = function () {
    Metronome.Discard(true)
    App.ResetState()
    App.Raise("Connected")
}

var onDisconnected = function () {
    App.Raise("Disconnected")

}

var onAssist = function () {
    App.UIAssistantShow()
}

var onBroadcast = function (msg, global, channel) {
    App.Raise("Broadcast",msg)

}
var onResponse = function (msgtype, id, data) {
    App.onResponse(msgtype, id, data)
}
let MsgsMissReturn={}
MsgsMissReturn[String.fromCharCode(27)+"[2;37;0m牧民打着手势对你说：请到我家里坐一坐吧？."]=true
MsgsMissReturn[String.fromCharCode(27)+"[2;37;0m牧民憨厚地对你笑者。"]=true
MsgsMissReturn["牧民打着手势对你说：请到我家里坐一坐吧？."]=true
MsgsMissReturn["牧民憨厚地对你笑者。"]=true
MsgsMissReturn[String.fromCharCode(27)+"吕大人,您再喝两杯吧!"]=true
MsgsMissReturn["吕大人,您再喝两杯吧!"]=true
let MsgsMissRe={
    "泼皮一把":/^泼皮一把拦住.+：要向从此过，留下买路财！$/
}
var onBuffer = function (data,bytes) {
    if (data==null){
        if (DebugLevel>0){
            Note("-")
        }
        App.Raise("GA")
        return
    }
    if (data.length == 2) {
        if (bytes[0]==255&&bytes[1]==249){
            App.Raise("GA")
            return true
        }
        //提示符
        return data == "> "
    }
    if (data.length == 11) {
        if (data[0].charCodeAt() == 27 && data.slice(1, 7) == "[1;36m" && data.slice(-2) == "..") {
            //武当诵经
            return true
        }
        if (data[0].charCodeAt() == 27 && data.slice(1, 9) == "[2;37;0m" && data.slice(-2) == "> ") {
            //白色提示符
            return true
        }
        return false
    }
    if (data.slice(-1) == "]" && false) {
        if (data.length > 4 && data.length < 50) {
            if (data[0] == "[") {
                return true
            }
            if (data[0].charCodeAt() == 27 && data.slice(1, 10) == "[2;37;0m[") {
                return true
            }
        }
    }
    if (data.length == 20) {
        if (data[9].charCodeAt() == 27 && data.slice(10, 16) == "[1;36m" && data[0].charCodeAt() == 27 && data.slice(1, 9) == "[2;37;0m" && data.slice(-2) == "..") {
            //白色提示符+诵经
            return true
        }
    }
    if (data.length > 20) {
        if (data.substr(0, 7) == "== 未完继续" && data.substr(-6, 6) == "继续下一页)") {
            return true
        }
    }
    if (MsgsMissReturn[data]){
        return true
    }
    return false
}
let csi = "\x1b"
let replace = ""
var onSubneg = function (code, data) {
    if (!data) {
        return
    }
    switch (code) {
        case 201:
            data = data.split(csi).join("\\u001b")
            let cmd = SplitN(data, " ", 2)
            let cmddata = cmd.length > 1 ? JSON.parse(cmd[1]) : null
            // switch (cmd[0]) {
            //     case "GMCP.Move":
            //         App.Raise("GMCP." + cmd[0], cmddata)
            //         App.Core.RoomObjEnd()
            //         return
            // }
            App.Raise("GMCP." + cmd[0], cmddata)
            return
    }
}
var onFocus = function () {
    App.RaiseStateEvent("focus")
}
var onHUDClick = function (x, y) {
    App.Raise("onHUDClick", { X: x, Y: y })
}
var onKeyUp=function(key){
    App.OnKeyUp(key)
}
var loader = function () {
    this.Loaded = {}
    let cache = {}
    this.reader = world.ReadFile

    this.Include = function (file) {
        if (this.Loaded[file]) {
            return cache[file]
        }
        cache[file] = eval(this.reader(file), file)
        this.Loaded[file] = true
        return cache[file]
    }
}
var Modules = new loader()
var Mod = new loader()
Mod.reader = world.ReadModFile
var Include = function (file) {
    return Modules.Include(file)
}
Include("util.js")
Include("push.js")
Include("app.js")

SetPriority(0)
App.Start()
