var Version = {
    Major: 2022,
    Minor: 529,
}
var App = {}
App.Mod = {}
App.Init = function () {
    App.Core = {}
    App.Info = {}
    App.API = {}
    App.Alias = {}
    App.Callbacks = {}
    App.Listeners = {}
    App.Data = {
        Running: false,
    }
    App.Mods = {}
}
App.OnTimerGC = function (name) {
    App.Raise("gc")
}
App.RegisterCallback = function (name, fn) {
    App.Callbacks[name] = fn
}
App.ExecuteCallback = function (name, data) {
    if (name) {
        var fn = App.Callbacks[name]
        if (!fn) {
            throw "回调[" + name + "]无法找到"
        }
        return fn(data)
    }
}
App.Bind = function (event, callback) {
    var listeners = App.Listeners[event]
    if (!listeners) {
        listeners = []
    }
    listeners.push(callback)
    App.Listeners[event] = listeners
}
App.Unbind = function (event, callback) {
    var listeners = App.Listeners[event]
    if (!listeners) {
        return
    }
    for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] == callback) {
            listeners.splice(i, 1)
            return
        }
    }
}
App.UnbindAll = function (event) {
    delete (App.Listeners[event])
}
App.Raise = function (event, data) {
    var listeners = App.Listeners[event]
    if (listeners) {
        listeners.forEach(function (fn) {
            App.Callbacks[fn](data)
        })
    }
}
App.Stopped = true
App.Stop = function () {
    App.Core.Sell.Reset()
    Note("中止任务")
    App.Stopped = true
    App.RaiseStateEvent("stop")
}
App.onResponse = function (msgtype, id, data) {
    App.Raise("response", { type: msgtype, id: id, data: data })
}
App.Load = function (name) {
    Include(name)
}
App.LoadModsConfig=function(name){
    let config=GetVariable("mods_config").split("\n")
    for (var i=0;i<config.length;i++){
        if (config[i].startsWith(name+"=")){
            return config[i].slice((name+"=").length)
        }
    }
    return ""
}
App.LoadMods = function () {
    var mods = {}
    let white_list = GetVariable("mods_list_whitelist_mode").trim() != ""
    let modlist = GetVariable("mods_list").trim()
    if (modlist) {
        let ms = modlist.split("\n")
        for (var i = 0; i < ms.length; i++) {
            mods[ms[i]] = true
        }
        if (white_list) {
            Note("以白名单模式加载模块[" + ms.join(",") + "]")
        } else {
            Note("以黑名单模式屏蔽模块[" + ms.join(",") + "]")
        }
    }
    let mod = GetModInfo()
    if (mod.Exists) {
        mod.FolderList.forEach(function (mod) {
            if (HasModFile(mod + "/src/index.js")) {
                if ((mods[mod] && white_list) || !mod[mod] && !white_list) {
                    Note("发现mod[" + mod + "],加载中")
                    Mod.Include(mod + "/src/index.js")
                }
            }
        })
    }
}
App.Start = function () {
    App.Init()
    App.LoadMods()
    App.Load("ui/ui.js")
    App.Load("param/param.js")
    App.Load("core/core.js")
    App.Load("info/info.js")
    App.Load("alias/alias.js")
    App.Load("quest/quest.js")
    App.Raise("BeforeInit")
    App.Raise("Init")
    App.Raise("InitMod")
    App.Raise("Ready")
    App.Raise("AfterReady")
}
App.DumpData = function () {
    Dump(App.Data, true)
}
App.RegisterAPI = function (name, fm) {
    App.API[name] = fm
}
Dump = function (data, silence) {
    let output = JSON.stringify(data, null, 2)
    if (!silence) {
        world.Note(output)
    }
    return output
}
Debug = function () {
    Dump(App.Data)
}
Bound = function () {
    Dump(App.Listeners)
}
DumpPath = function (fr, to, full) {
    if (typeof (to) == "string") {
        to = [to]
    }
    let path = App.API.GetPath(fr, to)
    if (path == null) {
        Dump(path)
        return
    }
    Dump(full ? path : path.Command)
}