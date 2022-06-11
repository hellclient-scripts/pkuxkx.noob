(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="wd"
    }
    Quest.prototype.Start=function(param){
        App.Quest.WD.Start()
    }
    return Quest
})(App)