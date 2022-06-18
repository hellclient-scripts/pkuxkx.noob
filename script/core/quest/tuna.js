(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="tuna"
        this.Desc="循环吐纳"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Tuna.Start(param)
    }
    return Quest
})(App)