(function(App){
    let walk=Include("include/option/walk.js")
    let path=Include("include/option/path.js")
    let question=Include("include/option/question.js")
    let find=Include("include/option/find.js")
    let prepare=Include("include/option/prepare.js")
    let kill=Include("include/option/kill.js")

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
    App.Options.NewFind=function(path,goal,vehicle){
        return new find(path,goal,vehicle)
    }
    App.Options.NewPrepare=function(level,items,group){
        return new prepare(level,items,group)
    }
    App.Options.NewKill=function(name,type){
        return new kill(name,type)
    }
}(App))