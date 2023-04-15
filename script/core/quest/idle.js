(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="idle"
        this.Desc="发呆，在指定位置发呆等待指定时间，不会进行准备。格式为 #quests idle home 或者 #quests idle home::120"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Idle.Start(param||"")
    }
    return Quest
})(App)