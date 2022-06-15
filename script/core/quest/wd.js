(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="wd"
        this.Desc="武当新人任务"
    }
    Quest.prototype.Start=function(param){
        App.Quest.WD.Start()
    }
    return Quest
})(App)