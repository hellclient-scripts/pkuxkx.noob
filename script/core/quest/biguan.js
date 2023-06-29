(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="biguan"
        this.Desc="闭关，在指定位置闭关，格式为 #quests biguan abandon skills::biguan off::jxj::yz-sczh::30。默认无指令，在jxj闭关，出口在扬州盛昌总行，每次60秒。建议和xiuxingdian条件一起使用，如 #quests xiuxingdian 6000>>biguan abandon skills ; #quests xiuxingdian 12000>>biguan abandon skills::biguan off"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Biguan.Start(param||"")
    }
    return Quest
})(App)