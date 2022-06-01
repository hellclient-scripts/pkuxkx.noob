(function (app) {
    let statecontext = Include("include/statecontext.js")
    let GlobalStateContext=function(){
        statecontext.call(this)
    }
    GlobalStateContext.prototype = Object.create(statecontext.prototype)
    GlobalStateContext.prototype.ChangeState=function(newstatue){
        App.Data.State=newstatue.ID
        statecontext.prototype.ChangeState.call(this,newstatue)
        if (App.Data.Automata.length!=0 && App.Data.State!="ready"){
            let a=App.Data.Automata[App.Data.Automata.length-1]
            a.SetCurrentState(App.Data.State)
        }
        
    }
    return GlobalStateContext
})(App)