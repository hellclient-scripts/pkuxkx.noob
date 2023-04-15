(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="standby"
        this.Desc="待命，在指定位置待命等待指定时间，会进行准备。格式为 #quests standby home 或者 #quests standby home::120"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Standby.Start(param||"")
    }
    return Quest
})(App)