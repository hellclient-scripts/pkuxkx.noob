(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="getgem"
        this.Desc="取出宝石，#q getgem 将取出所有宝石。可带参数对宝石进行筛选。如 #q getgem abc 取出abc三种宝石,#q getgem 3+ 取出3+宝石,#q getgem 5- 取出5-的宝石,#q getgem 4 取出4级宝石,也可以将种类河级别混合，日#q getgem ab3+ 取出3+的ab宝石"
    }
    Quest.prototype.Start=function(param){
        App.Quest.GetGem.Get.Start(param)
    }
    return Quest
})(App)