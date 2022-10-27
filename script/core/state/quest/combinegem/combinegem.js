(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State = function () {
        basicstate.call(this)
        this.ID = "core.state.quest.combinegem.combinegem"
        this.Groups = this.Groups.concat(["state.line"])
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Online = function (line) {
        switch (line) {
            case "你身上没有这种宝石。":
                App.Quest.CombineGem.Data.Todo = App.Quest.CombineGem.Data.Todo.slice(1)
                App.Quest.CombineGem.Data.Index=1
                break
            case "你必须有三块同样的宝石才能进行合并！":
                App.Quest.CombineGem.Data.Index++
                break
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
        App.Send("combine " + App.Quest.CombineGem.Data.Todo[0]+" "+App.Quest.CombineGem.Data.Index)
        App.Core.CheckBusy()
    }
    return State
})(App)