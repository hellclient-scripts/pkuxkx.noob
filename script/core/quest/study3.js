(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="study3"
        this.Desc="学习备用列表"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Study.Start3(param)
    }
    return Quest
})(App)