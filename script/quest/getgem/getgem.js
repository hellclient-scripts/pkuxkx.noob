(function (App) {
    let getre = "^([A-Z]*)(([0-9])([+-]){0,1}){0,1}$"
    App.Quest.GetGem = {}
    App.Quest.GetGem.Pack = {}
    App.Quest.GetGem.Pack.Data = {}
    App.Quest.GetGem.Pack.Start = function (param) {
        let target = param.trim()
        let cmd = (target == "") ? "pack gem" : "put gem in " + target
        App.Commands([
            App.NewCommand("function",function(){
                App.PackGem(cmd)
            }),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                Note("存放完毕，进入冷却1秒")
                App.Core.Quest.Cooldown("packgem", 1000)
                App.Next()                        
            })
        ]).Push()
        App.Next()
    }
    App.Quest.GetGem.Get = {}
    App.Quest.GetGem.Get.Data = {
        Pack: "",
        Commands: [],
        Type: null,
        Level: null,
        Compare: null,
    }
    App.Quest.GetGem.Get.Exec = function () {
        for (var i = 0; i < App.Quest.GetGem.Get.Data.Commands.length; i++) {
            App.Send(App.Quest.GetGem.Get.Data.Commands[i].toLowerCase())
        }
        App.Next()
    }
    App.Quest.GetGem.Get.Filter = function (v1, v2, v3) {
        if (App.Quest.GetGem.Get.Data.Type != null) {
            if (!App.Quest.GetGem.Get.Data.Type[v1]) {
                return false
            }
        }
        if (App.Quest.GetGem.Get.Data.Level != null) {
            switch (App.Quest.GetGem.Get.Data.Compare) {
                case null:
                    if (!((v2-0)==App.Quest.GetGem.Get.Data.Level)){
                        return false
                    }
                    break
                case "+":
                    if (!((v2-0)>=App.Quest.GetGem.Get.Data.Level)){
                        return false
                    }
                    break
                case "-":
                    if (!((v2-0)<=App.Quest.GetGem.Get.Data.Level)){
                        return false
                    }
                    break
            }
        }
        return true
    }
    App.Quest.GetGem.Get.Start = function (param) {
        param = param.trim().toUpperCase()
        App.Quest.GetGem.Get.Data = {
            Pack: "",
            Commands: [],
            Type: null,
            Level: null,
            Compare: null,
        }
        if (param) {
            let data = param.match(getre)
            if (data == null) {
                throw "getgem 参数" + param + "错误"
            }
            if (data[1]) {
                App.Quest.GetGem.Get.Data.Type = {}
                for (var i = 0; i < data[1].length; i++) {
                    App.Quest.GetGem.Get.Data.Type[data[1][i]] = true
                }
            }
            App.Quest.GetGem.Get.Data.Level = data[3] - 0
            App.Quest.GetGem.Get.Data.Compare = data[4]
        }
        App.Commands([
            App.NewCommand("state", "core.state.quest.getgem.getgem"),
            App.NewCommand("function", App.Quest.GetGem.Get.Exec),
            App.NewCommand("nobusy")
        ]).Push()
        App.Next()

    }
    App.RegisterState(new (Include("core/state/quest/getgem/getgem.js"))())

})(App)