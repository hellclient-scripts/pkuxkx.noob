(function(){
    let basemode=Include("core/gamemode/gamemode.js")
    let GameMode=function(){
        this.ID="懒鬼"
    }
    GameMode.prototype = Object.create(basemode.prototype)
    GameMode.prototype.SuccessFullmeDelay=function(){
        return 59*60*1000
    }
    return GameMode
})()