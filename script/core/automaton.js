(function(App){
    let automaton=Include("include/automaton.js")
    App.Core.Automata=[]
    App.Automaton={}
    App.Automaton.Current=function(){
        if (App.Core.Automata.length==0){
            throw "自动机为空"
        }
        return App.Core.Automata[App.Core.Automata.length-1]
    }
    App.Automaton.New=function(states,final){
        let a=new automaton(states,final)
        App.Core.Automata=[t]
        return a
    }
    App.Automaton.Push=function(states,final){
        let a=new automaton(states,final)
        App.Core.Automata.push(a)
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
        if (App.Core.Automata.length==0){
            throw "自动机为空"
        }
        return App.Core.Automata.pop()
    }
    App.Automaton.Finish=function(){
        let final=App.Automaton.Current().FinalState
        App.Core.Automata.pop()
        App.ChangeState(final?final:"ready")
    }
    App.Automaton.Fail=function(){
        if (App.Core.Automata.length==0){
            world.Note("自动任务失败")
            App.ChangeState("manual")
            return
        }
        let fail=App.Automaton.Current().FailState
        App.Core.Automata.pop()
        if (!fail){
            App.Automaton.Fail()
        }else{
            App.ChangeState(fail)
        }
    }
    App.Automaton.Loop=function(label){
        if (!label){
            label="defaultloop"
        }
        let a=new automaton(["ready"]).WithLoop(label)
        App.Core.Automata.push(a)
        return a
    }
    App.Automaton.Break=function(label){
        if (!label){
            label="defaultloop"
        }
        if (App.Core.Automata.length==0){
            world.Note("自动任务失败")
            App.ChangeState("manual")
            return
        }
        let a=App.Automaton.Current()
        App.Core.Automata.pop()
        if (a.Loop!=label){
            App.Automaton.Break(label)
            return
        }
    }

    App.Automaton.Flush=function(){
        App.Core.Automata=[]
    }
    let auto=function(){
        if (App.Core.Automata.length==0){
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
    App.Loop=App.Automaton.Loop
    App.Break=App.Automaton.Break
    App.RegisterState(new (Include("core/state/nobusy.js"))())
    App.Bind("Response.core.state.response","core.automaton.ready")
    App.ResponseReady=function(){
        App.Response("core","state.response")
    }
    App.Wait=function(delay,final){
        let a=App.Automaton.Push(["wait"],final).WithData("Delay",delay)
        App.Next()        
    }
    App.RegisterState(new (Include("core/state/wait.js"))())

})(App)