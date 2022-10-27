(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="getgem"
        this.Desc="取出宝石，#q getgem 将取出所有宝石"
    }
    Quest.prototype.Start=function(param){
        App.Quest.GetGem.Get.Start(param)
    }
    return Quest
})(App)