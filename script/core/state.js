(function(App){
    let globalstatecontext=Include("core/state/globalstatecontext.js")
    App.Data.State=""
    App.States={}
    App.StateContext=new globalstatecontext()
    App.RegisterState=function(state){
        if (state.ID==""){
            throw "State id不可为空"
        }
        App.States[state.ID]=state
    }
    App.GetState=function(id){
        let state=App.States[id]
        if (!state){
            throw "未知的state id "+id
        }
        return state
    }
    let logState=false
    let logData=false
    App.LogState=function(withdata){
        logState=true
        logData=withdata
    }
    App.ChangeState=function(id){
        let state=App.GetState(id)
        if (logState){
            Note("State log:change state ["+id+"]")
        }
        App.StateContext.ChangeState(state)
    }
    App.LastState=function(){
        return App.StateContext.LastState
    }
    App.RaiseStateEvent=function(event,data){
        App.StateContext.OnEvent(event,data)
    }
    App.RegisterState(new (Include("core/state/stateinit.js"))())
    App.RegisterState(new (Include("core/state/stateready.js"))())
    App.RegisterState(new (Include("core/state/statemanual.js"))())
    App.RegisterState(new (Include("core/state/statecheckitem.js"))())
    App.RegisterCallback("core.state.init",function(){
        App.ChangeState("init")
    })
    App.Bind("Init", "core.state.init")
})(App)