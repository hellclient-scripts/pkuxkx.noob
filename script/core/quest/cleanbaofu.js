(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="cleanbaofu"
        this.Summary="清空包袱"
        this.Desc="取出身上包袱里所有的东西，并卖掉多于包袱"
    }
    Quest.prototype.Start=function(param){
        App.Quest.CleanBaofu.Start(param)
    }
    return Quest
})(App)