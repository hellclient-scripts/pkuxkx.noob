(function(app){
    let automaton=Include("include/automaton.js")
    app.Data.Automata=[]
    app.Automaton={}
    app.Automaton.Current=function(){
        if (app.Data.Automata.length==0){
            throw "自动机为空"
        }
        return app.Data.Automata[app.Data.Automata.length-1]
    }
    app.Automaton.New=function(final,states){
        let a=new automaton(final,states)
        app.Data.Automata=[t]
        return a
    }
    app.Automaton.Push=function(final,states){
        let a=new automaton(final,states)
        app.Data.Automata.push(a)
        return a
    }
    app.Automaton.GetContext=function(key){
        return app.Automaton.Current().Context[key]
    }
    app.Automaton.SetContext=function(key,value){
        return app.Automaton.Current().Context[key]=value
    }
    app.Automaton.Pop=function(){
        if (app.Data.Automata.length==0){
            throw "自动机为空"
        }
        return app.Data.Automata.pop()
    }
    app.Automaton.Finish=function(){
        let final=app.Automaton.Current().Final
        app.Data.Automata.pop()
        app.ChangeState(final?final:"ready")
    }
    app.Automaton.Fail=function(){
        if (app.Data.Automata.length==0){
            world.Note("自动任务失败")
            app.ChangeState("manual")
            return
        }
        let fail=app.Automaton.Current().Fail
        app.Data.Automata.pop()
        if (!fail){
            app.Automaton.Fail()
        }else{
            app.ChangeState(fail)
        }
        
    }
    app.Automaton.Flush=function(){
        app.Data.Automata=[]
    }
    let auto=function(){
        if (app.Data.Automata.length==0){
            world.Note("自动任务结束")
            app.ChangeState("manual")
            return
        }
        let a=app.Automaton.Current()
        if (a.Transitions.length){
            app.ChangeState(t.Transitions.shift())
            return
        }
        a.Automaton.Finish()
    }
    app.GetContext=app.Automaton.GetContext
    app.SetContext=app.Automaton.SetContext
    app.GetState("ready").Handler=auto
    app.Finish=app.Automaton.Finish
    app.Fail=app.Automaton.Fail
})(App)