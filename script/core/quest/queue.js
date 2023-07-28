(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="queue"
        this.Summary="自定义队列"
        this.Desc="执行queue变量中的队列"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Queue.Start(param)
    }
    return Quest
})(App)