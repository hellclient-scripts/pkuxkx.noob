(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="biguan"
        this.Desc="闭关，在指定位置闭关，格式为 #quests biguan jxj 或者 #quests idle jxj::120。默认在jxj闭关。建议和xiuxingdian条件一起使用，如 #quests xiuxingdian 6000>>biguan"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Biguan.Start(param||"")
    }
    return Quest
})(App)