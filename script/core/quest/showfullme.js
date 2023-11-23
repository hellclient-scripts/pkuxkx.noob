(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="showfullme"
        this.Desc="显示最后一次fullme并将结果存在show_content变量内";
    }
    Quest.prototype.Start=function(param){
        App.Quest.Fullme.Show()
    }
    return Quest
})(App)