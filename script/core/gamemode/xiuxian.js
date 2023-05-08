(function(){
    let basemode=Include("core/gamemode/gamemode.js")
    let GameMode=function(){
        this.ID="休闲"
    }
    GameMode.prototype = Object.create(basemode.prototype)
    GameMode.prototype.SuccessFullmeDelay=function(){
        return 30*60*1000
    }
    return GameMode
})()