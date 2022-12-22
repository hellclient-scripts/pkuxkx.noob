(function (App) {

    let packre=/^[^【：『]{1,10}\(([^)]+)\)\s*\[(\d+)\/(\d+)\]$/
    let gemlinere=/^│((|\[[A-Z][12345678][ABC]\][地山水风雷火泽天].(精金|木灵|玄冰|炎晶|玉髓|神龙骨|凤凰羽|麒麟角|玄武甲|日魂|月魄)\*\d+)\s*│)*$/
    let gemre=/^\[([A-Z])([12345678])([ABC])\][地山水风雷火泽天].(精金|木灵|玄冰|炎晶|玉髓|神龙骨|凤凰羽|麒麟角|玄武甲|日魂|月魄)\*(\d+)\s*$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.quest.getgem.compressgem"
        this.Groups = this.Groups.concat(["state.line"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Online = function (line) {
        if (!App.Quest.GetGem.Compress.Data.Pack){
            let result=line.match(packre)
            if (result){
                App.Quest.GetGem.Compress.Data.Pack=result[1]
                App.Quest.GetGem.Compress.Data.Min=result[2]
                App.Quest.GetGem.Compress.Data.Max=result[3]
            }
            return
        }
        if (line.match(gemlinere)){
            var data=line.split("│")
            for (var i=0;i<data.length;i++){
                let text=data[i].trim()
                if (text){
                    var gem=text.match(gemre)
                    if (gem&&(gem[2]<8)&&((gem[5]-0)>=3)){
                        if (App.Quest.GetGem.Compress.Data.Level==""||App.Quest.GetGem.Compress.Data.Level>gem[2]){
                            App.Quest.GetGem.Compress.Data.Level=gem[2]
                            App.Quest.GetGem.Compress.Data.Target=gem[1]+gem[2]+gem[3]
                        }
                    }
                }
            }
        }
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "line":
                this.Online(data)
                break
            case "busy":
                world.DoAfterSpecial(1, 'App.Core.CheckBusy()', 12);
                break
            case "nobusy":
                App.Next()
                break
        }

    }
    State.prototype.Enter = function (context, oldstatue) {
        App.Send("jiancha")
        App.Core.CheckBusy()
    }
    return State
})(App)