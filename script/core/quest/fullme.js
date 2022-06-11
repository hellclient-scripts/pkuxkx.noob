(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="fullme"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Fullme.Start()
    }
    return Quest
})(App)