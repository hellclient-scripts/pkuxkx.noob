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
    App.ImportState=function(id){
        let state=App.GetState(id)
        if (logState){
            Note("State log:import state ["+id+"]")
        }
        App.StateContext.ImportState(state)

    }
    App.CurrentState=function(){
        return App.StateContext.State
    }
    App.LastState=function(){
        return App.StateContext.LastState
    }
    App.RaiseStateEvent=function(event,data){
        App.StateContext.OnEvent(event,data)
    }
    App.RegisterState(new (Include("core/state/init.js"))())
    App.RegisterState(new (Include("core/state/ready.js"))())
    App.RegisterState(new (Include("core/state/manual.js"))())
    App.RegisterState(new (Include("core/state/checkitem.js"))())
    App.RegisterCallback("core.state.init",function(){
        App.ChangeState("init")
    })
    App.Bind("Init", "core.state.init")
})(App)