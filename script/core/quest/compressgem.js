(function (App) {
    let basicquest=Include("include/quest.js")
    let Quest=function(){
        basicquest.call(this)
        this.ID="compressgem"
        this.Desc="压缩宝石，避免锦囊塞满。可以带数字参数，0到1直接的小数代表开始压缩的比例，否则为超过多少宝石即开始压缩"
    }
    Quest.prototype.Start=function(param){
        App.Quest.GetGem.Compress.Start(param)
    }
    return Quest
})(App)