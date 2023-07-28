(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="biguan"
        this.Desc="闭关，在指定位置闭关，格式为 #quests 60::jxj::yz-sczh。默认每次60秒，在jxj闭关，出口在扬州盛昌总行。建议和xiuxingdian条件一起使用，如 #quests xiuxingdian 6000>>biguan abandon skills ; #quests xiuxingdian 12000>>biguan abandon skills::biguan。"
        this.Summary="闭关"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Biguan.Start(param||"")
    }
    return Quest
})(App)