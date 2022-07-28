(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="lianyao"
        this.Desc="炼药,使用方式为 lianyao 药物名。需要手工准备药物，火折，药炉。炼光材料结束"
    }
    Quest.prototype.Start=function(param){
        App.Quest.Lianyao.Start(param)
    }
    return Quest
})(App)