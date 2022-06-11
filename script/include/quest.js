(function(){
    let Quest=function(){
        this.ID=""
    }
    Quest.prototype.IsEscaped=function(move){
        return false
    }
    Quest.prototype.Explore=function(move){
    }
    return Quest
})()