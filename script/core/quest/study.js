(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="study"
        this.Desc="学习"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Study.Start(param)
    }
    return Quest
})(App)