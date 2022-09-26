(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="idall"
        this.Desc="鉴定全部装备，命令为#q idall。需要手动处理"
    }
    Quest.prototype.Start=function(param){
        App.Quest.IDAll.Start()
    }
    return Quest
})(App)