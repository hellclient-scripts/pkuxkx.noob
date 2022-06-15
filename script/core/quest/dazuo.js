(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="dazuo"
        this.Desc="循环打坐"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Dazuo.Start(param)
    }
    return Quest
})(App)