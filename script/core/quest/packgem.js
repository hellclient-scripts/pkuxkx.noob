(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="packgem"
        this.Desc="保存宝石，#q packgem 将身上的宝石全部保存。可以提供容器作为参数，将宝石放入容器，如#q packgem bao"
    }
    Quest.prototype.Start=function(param){
        App.Quest.GetGem.Pack.Start(param)
    }
    return Quest
})(App)