(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="keeper"
        this.Summary="接货"
        this.Desc="接货，在指定位置接货。格式为 #quests keeper yz-rbz。不带地点默认在yz-rbz等待"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Keeper.Start(param||"")
    }
    return Quest
})(App)