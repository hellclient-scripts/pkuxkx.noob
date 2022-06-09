(function(App){
    let walk=Include("include/option/walk.js")
    let path=Include("include/option/path.js")
    let question=Include("include/option/question.js")

    App.Options={}
    App.Options.NewWalk=function(target,vehicle){
        return new walk(target,vehicle)
    }
    App.Options.NewPath=function(target,vehicle){
        return new path(target,vehicle)
    }
    App.Options.NewQuestion=function(npc,q,length){
        return new question(npc,q,length)
    }
}(App))