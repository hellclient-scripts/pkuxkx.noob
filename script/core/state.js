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
            throw "未知的state id "+id
        }
        return state
    }
    app.ChangeState=function(id){
        let state=app.GetState(id)
        app.StateContext.ChangeState(state)
    }
    app.LastState=function(){
        return app.StateContext.LastState
    }
    app.OnStateEvent=function(event,data){
        app.StateContext.OnEvent(event,data)
    }
    app.RegisterState(new (Include("core/state/stateinit.js"))())
    app.RegisterState(new (Include("core/state/stateready.js"))())
    app.RegisterState(new (Include("core/state/stateprepare.js"))())
    app.RegisterState(new (Include("core/state/statemanual.js"))())
    app.RegisterState(new (Include("core/state/statecheckitem.js"))())
    app.RegisterCallback("core.state.init",function(){
        app.ChangeState("init")
    })
    app.Bind("Ready", "core.state.init")
})(App)