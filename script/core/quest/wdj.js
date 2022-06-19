(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="wdj"
        this.Desc="五毒教新人任务"
    }
    Quest.prototype.Start=function(param){
        App.Quest.WDJ.Start()
    }
    return Quest
})(App)