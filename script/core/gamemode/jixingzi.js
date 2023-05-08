(function(){
    let basemode=Include("core/gamemode/gamemode.js")
    let GameMode=function(){
        this.ID="急性子"
    }
    GameMode.prototype = Object.create(basemode.prototype)
    GameMode.prototype.SuccessFullmeDelay=function(){
        return 15*60*1000
    }
    return GameMode
})()