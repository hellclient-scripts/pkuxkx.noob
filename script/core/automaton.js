(function(App){
    let automaton=Include("include/automaton.js")
    let active=Include("include/active.js")
    let actives=Include("include/actives.js")

    App.Data.Automata=[]
    App.Automaton={}
    App.Automaton.Current=function(){
        if (App.Data.Automata.length==0){
            throw "自动机为空"
        }
        return App.Data.Automata[App.Data.Automata.length-1]
    }
    App.DumpAutomaton=function(){
        Dump(App.Automaton)
    }
    App.Automaton.New=function(states,final){
        let a=new automaton(states,final)
        App.Data.Automata=[t]
        return a
    }
    App.Automaton.Push=function(states,final){
        let a=new automaton(states,final)
        App.Data.Automata.push(a)
        return a
    }
    App.Push=App.Automaton.Push
    App.Automaton.GetContext=function(key){
        return App.Automaton.Current().Context[key]
    }
    App.Automaton.SetContext=function(key,value){
        return App.Automaton.Current().Context[key]=value
    }
    App.Automaton.Pop=function(){
        if (App.Data.Automata.length==0){
            throw "自动机为空"
        }
        return App.Data.Automata.pop()
    }
    App.Automaton.Finish=function(){
        let final=App.Automaton.Current().FinalState
        App.Data.Automata.pop()
        App.ChangeState(final?final:"ready")
    }
    App.Automaton.Fail=function(){
        if (App.Data.Automata.length==0){
            world.Note("自动任务失败")
            App.ChangeState("manual")
            return
        }
        let fail=App.Automaton.Current().FailState
        App.Data.Automata.pop()
        if (!fail){
            App.Automaton.Fail()
        }else{
            App.ChangeState(fail)
        }
        
    }
    App.Automaton.Flush=function(){
        App.Data.Automata=[]
    }
    let auto=function(){
        if (App.Data.Automata.length==0){
            world.Note("自动任务结束")
            App.ChangeState("manual")
            return
        }
        let a=App.Automaton.Current()
        if (a.Transitions.length){
            App.ChangeState(a.Transitions.shift())
            return
        }
        App.Automaton.Finish()
    }
    App.RegisterCallback("core.automaton.ready",function(){
        App.Next()        
    })
    App.Next=function(){
        App.ChangeState("ready")        
    }
    App.GetContext=App.Automaton.GetContext
    App.SetContext=App.Automaton.SetContext
    App.GetState("ready").Handler=auto
    App.Return=App.Automaton.Finish
    App.Fail=App.Automaton.Fail
    App.RegisterState(new (Include("core/state/statenobusy.js"))())
    App.GetState("nobusy").Callback="core.automaton.ready"
    App.Bind("Response.core.state.response","core.automaton.ready")
    App.ResponseReady=function(){
        App.Response("core","state.response")
    }
    App.NewActive=function(location,cmd,final,nobusy){
        return new active(location,cmd,final,nobusy)
    }
    App.NewPatrolActive=function(location,cmd,final,nobusy){
        if (location){
            location=app.API.ConvertPath(location)
        }
        return new active(location,cmd,final,nobusy).WithModeState("core.state.active.patrol")
    }
    
    App.RegisterState(new (Include("core/state/active/activeexecute.js"))())
    App.RegisterState(new (Include("core/state/active/activemove.js"))())
    App.RegisterState(new (Include("core/state/active/activepatrol.js"))())

    App.Wait=function(delay,final){
        let a=App.Automaton.Push(["wait"],final).WithData("Delay",delay)
        App.Next()        
    }
    App.RegisterState(new (Include("core/state/statewait.js"))())
    App.NewActives=function(activelist,final){
        return new actives(activelist,final)
    }
 
    App.RegisterState(new (Include("core/state/actives/activesready.js"))())
    App.RegisterState(new (Include("core/state/actives/activesstep.js"))())

})(App)