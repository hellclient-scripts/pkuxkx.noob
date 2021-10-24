(function(app){
    let globalstatecontext=Include("core/state/globalstatecontext.js")
    app.Data.State=""
    app.States={}
    app.StateContext=new globalstatecontext()
    app.RegisterState=function(state){
        if (state.ID==""){
            throw "State id不可为空"
        }
        app.States[state.ID]=state
    }
    app.GetState=function(id){
        let state=app.States[id]
        if (!state){
            throw "未知的state id"+id
        }
        return state
    }
    app.ChangeState=function(id){
        let state=app.GetState(id)
        app.StateContext.ChangeState(state)
    }
    app.OnStateEnvent=function(event,data){
        app.StateContext.OnEvent(event,data)
    }
    app.UpdateState=function(){
        let statuetext=app.Data.State
        world.SetStatus(statuetext);
    }
    app.RegisterState(new (Include("core/state/stateinit.js"))())
    app.RegisterState(new (Include("core/state/stateready.js"))())
    app.RegisterState(new (Include("core/state/stateprepare.js"))())
    app.RegisterState(new (Include("core/state/statemanual.js"))())
    app.ChangeState("init")
})(App)