(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="vein"
        this.Desc="通脉，需要自己设置set vein。通脉需要意外需要自己通过vein detail检查并处理"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Vein.Start(param)
    }
    return Quest
})(App)