(function(App){
    let walk=Include("include/option/walk.js")
    let path=Include("include/option/path.js")
    let question=Include("include/option/question.js")
    let find=Include("include/option/find.js")
    let prepare=Include("include/option/prepare.js")
    let kill=Include("include/option/kill.js")
    let item=Include("include/option/item.js")
    let search=Include("include/option/search.js")

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
    App.Options.NewFind=function(path,goal,target,vehicle){
        return new find(path,goal,target,vehicle)
    }
    App.Options.NewPrepare=function(level,items,group,exceptedmap){
        return new prepare(level,items,group,exceptedmap)
    }
    App.Options.NewKill=function(name,type,before,after){
        return new kill(name,type,before,after)
    }
    App.Options.NewItem=function(id,amount){
        return new item(id,amount)
    }
    App.Options.NewSearch=function(goal,depth,vehicle){
        return new search(goal,depth,vehicle)
    }
}(App))