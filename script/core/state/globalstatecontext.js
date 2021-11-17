(function (app) {
    let statecontext = Include("include/statecontext.js")
    let GlobalStateContext=function(){
        statecontext.call(this)
    }
    GlobalStateContext.prototype = Object.create(statecontext.prototype)
    GlobalStateContext.prototype.ChangeState=function(newstatue){
        app.Data.State=newstatue.ID
        statecontext.prototype.ChangeState.call(this,newstatue)
    }
    return GlobalStateContext
})(App)