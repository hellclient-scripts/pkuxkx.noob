(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let StateManual=function(){
        basicstate.call(this)
        this.ID="manual"
    }
    StateManual.prototype = Object.create(basicstate.prototype)
    StateManual.prototype.Enter=function(Context,newstatue){
        world.Note("进入手动模式")
        Userinput.Popup("","进入手动模式","可以点击输入框左侧的小人图标选择下一步的动作","info")
    }
    StateManual.prototype.OnEvent=function(context,event,data){
        switch(event){
            case "combat.fighting":
                Note("被叫杀，自动反击")
                App.Core.Combat.NewBlockedCombat()
                break
        }
    }
    return StateManual
})(App)