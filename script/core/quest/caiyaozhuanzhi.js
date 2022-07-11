(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="caiyaozhuanzhi"
        this.Desc="采药专职,只负责采药，需要手工处理其他"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Caiyao.Zhuanzhi()
    }
    return Quest
})(App)