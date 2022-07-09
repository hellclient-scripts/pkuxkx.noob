(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="caiyao"
        this.Desc="采药"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Caiyao.Start(param)
    }
    return Quest
})(App)