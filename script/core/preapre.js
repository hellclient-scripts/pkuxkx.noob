(function(app){
    app.RegisterCallback("",function(){
        
    })
    app.Preapre=function(){
        app.Send("l")
        app.Check(app.CheckLevelFull)
        app.CheckBusy("core.prepare.check")
    }
    app.RegisterCallback("core.prepare.check",function(){
        app.TryProposalGroups(["prepare"],"core.prepare.check","core.parepare.completed")
    })
    app.RegisterCallback("core.parepare.completed",function(){
        app.Data.Running=false
        app.ChangeState("manual")
    })
})(App)