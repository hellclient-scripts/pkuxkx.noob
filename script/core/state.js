(function(App){
    let globalstatecontext=Include("core/state/globalstatecontext.js")
    App.Data.State=""
    App.Data.StateHistory=[]
    App.Data.StateHistoryMax=20
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
    App.LoggingState=false
    let logData=false
    App.LogState=function(withdata){
        App.LoggingState=true
        logData=withdata
    }
    App.LogState
    App.ChangeState=function(id){
        let state=App.GetState(id)
        if (App.LoggingState){
            Note("State log:change state ["+id+"]")
        }
        App.Data.StateHistory.push(id)
        App.Data.StateHistory=App.Data.StateHistory.slice(-App.Data.StateHistoryMax)
        App.StateContext.ChangeState(state)
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