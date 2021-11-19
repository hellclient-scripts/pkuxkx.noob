(function (app) {
    let statecontext = Include("include/statecontext.js")
    let GlobalStateContext=function(){
        statecontext.call(this)
    }
    GlobalStateContext.prototype = Object.create(statecontext.prototype)
    GlobalStateContext.prototype.ChangeState=function(newstatue){
        app.Data.State=newstatue.ID
        statecontext.prototype.ChangeState.call(this,newstatue)
        if (app.Data.Automata.length!=0 && app.Data.State!="ready"){
            let a=app.Data.Automata[app.Data.Automata.length-1]
            a.SetCurrentState(app.Data.State)
        }
        
    }
    return GlobalStateContext
})(App)