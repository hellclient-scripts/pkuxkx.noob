(function (App) {

    let packre=/^[^【：『]{1,10}\(([^)]+)\)\s*\[\d+\/\d+\]$/
    let gemlinere=/^│(\[[A-Z][12345678][ABC]\][地山水风雷火泽天].(精金|木灵|玄冰|炎晶|玉髓|神龙骨|凤凰羽|麒麟角|玄武甲|日魂|月魄)\*\d+\s*│)+/
    let gemre=/^\[([A-Z])([12345678])([ABC])\][地山水风雷火泽天].(精金|木灵|玄冰|炎晶|玉髓|神龙骨|凤凰羽|麒麟角|玄武甲|日魂|月魄)\*(\d+)\s*$/
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.quest.getgem.getgem"
        this.Groups = this.Groups.concat(["state.line"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Online = function (line) {
        if (!App.Quest.GetGem.Get.Data.Pack){
            let result=line.match(packre)
            if (result){
                App.Quest.GetGem.Get.Data.Pack=result[1]
            }
            return
        }
        if (line.match(gemlinere)){
            var data=line.split("│")
            for (var i=0;i<data.length;i++){
                let text=data[i].trim()
                if (text){
                    var gem=text.match(gemre)
                    if (gem){
                        let count=gem[5]
                        for (var k=0;k<count;k++){
                            App.Quest.GetGem.Get.Data.Commands.push("get "+gem[1]+gem[2]+gem[3]+" from "+App.Quest.GetGem.Get.Data.Pack)                            
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