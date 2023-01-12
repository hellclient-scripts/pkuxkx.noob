(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="changespecial"
        this.Desc="切换特技，格式为 changespecial agile,ironskin 注意会自动重新登陆"
    }
    Quest.prototype.Start=function(param){
        App.Quest.ChangeSpecial.Start(param)
    }
    return Quest
})(App)