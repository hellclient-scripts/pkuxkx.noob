(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="dz"
        this.Desc="循环dz"
    }
    Quest.prototype.Start=function(param){
        App.Quest.DZ.Start(param)
    }
    return Quest
})(App)