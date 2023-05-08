(function(){
    let GameMode=function(){
        this.ID="随意"
    }
    GameMode.prototype.SuccessFullmeDelay=function(){
        return App.Quest.Fullme.SuccessFullmeDelay
    }
    return GameMode
})()