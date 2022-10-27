(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="combinegem"
        this.Desc="合成宝石，可以合成身上所有的宝石。#q combinegem 合成所有宝石。可以通过数字参数指定合成不超过指定级别的宝石，如#q combinegem 5"
    }
    Quest.prototype.Start=function(param){
        App.Quest.CombineGem.Start(param)
    }
    return Quest
})(App)