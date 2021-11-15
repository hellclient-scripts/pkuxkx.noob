(function(app){
    let transition=Include("include/transition.js")
    app.Data.Transitions=[]
    app.Transition={}
    app.Transition.StateID="transitionnext"
    app.Transition.Current=function(){
        if (app.Data.Transitions.length==0){
            throw "过渡为空"
        }
        return app.Data.Transitions.slice(-1)
    }
    app.Transition.New=function(final,states){
        let t=new transition(final,states)
        app.Data.Transitions=[t]
        return t
    }
    app.Transition.Push=function(final,states){
        let t=new transition(final,states)
        app.Data.Transitions.push(t)
        return t
    }
    app.Transition.Next=function(){
        app.ChangeState(app.Transition.StateID)
    }
    app.Transition.Data=function(key){
        return app.Transition.Current.Context[key]
    }
    app.Transition.Pop=function(){
        if (app.Data.Transitions.length==0){
            throw "过渡为空"
        }
        return app.Data.Transitions.pop()
    }
    app.Transition.Finish=function(){
        let final=app.Transition.Current().Final
        app.Data.Transitions.pop()
        app.ChangeState(final?final:app.Transition.StateID)
    }
    app.Transition.Fail=function(){
        let fail=app.Transition.Current().Fail
        app.Data.Transitions.pop()
        app.ChangeState(fail?fail:app.Transition.StateID)
    }
    app.Transition.Flush=function(){
        app.Data.Transitions=[]
    }
    let next=function(){
        if (app.Data.Transitions.length==0){
            app.ChangeState("ready")
            return
        }
        let t=app.Transition.Current()
        if (t.States.length){
            app.ChangeState(t.States.shift())
            return
        }
        a.Transition.Finish()
    }
    app.RegisterState(new (Include("core/state/statenext.js"))(app.Transition.StateID,next))
})(App)