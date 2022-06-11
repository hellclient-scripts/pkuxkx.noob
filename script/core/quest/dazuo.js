(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="dazuo"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Dazuo.Start()
    }
    return Quest
})(App)