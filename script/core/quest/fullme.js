(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="fullme"
        this.Desc="弹出Fullme输入框,用于在任务直接可以通过#fullme指令，在任务接受弹出输入框。可以和fullmeok>>条件组合，穿插需求fullme的任务，和不需要fullme的练功"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Fullme.Start()
    }
    return Quest
})(App)