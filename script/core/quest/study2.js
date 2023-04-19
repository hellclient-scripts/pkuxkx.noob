(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="study2"
        this.Desc="学习备用列表"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Study.Start2(param)
    }
    return Quest
})(App)