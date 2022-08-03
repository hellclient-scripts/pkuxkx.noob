(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="yaopulianyao"
        this.Desc="药铺炼药练级，自动购买药材,使用方式为 yaopulianyao 位置 药物名。需要手动付费/续租"
    }
    Quest.prototype.Start=function(param){
        let data=SplitN(param," ",2)
        App.Quest.Lianyao.Yaopu(data[0],data[1])
    }
    return Quest
})(App)