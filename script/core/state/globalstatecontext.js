(function (app) {
    let statecontext = Include("include/statecontext.js")
    let GlobalStateContext=function(){
        statecontext.call(this)
    }
    GlobalStateContext.prototype = Object.create(statecontext.prototype)
    GlobalStateContext.prototype.ChangeState=function(newstatue){
        statecontext.prototype.ChangeState.call(this,newstatue)
        app.Data.State=newstatue.ID
    }
    return GlobalStateContext
})(App)