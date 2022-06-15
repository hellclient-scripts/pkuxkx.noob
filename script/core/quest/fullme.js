(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="fullme"
        this.Desc="弹出Fullme输入框"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Fullme.Start()
    }
    return Quest
})(App)