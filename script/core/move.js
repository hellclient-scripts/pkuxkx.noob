(function(app){
    newMove=function(){
        var m={
            Mode:"",
            Path:[],
            Searched:[],
            Target:"",
            OnStep:"",
            OnFinish:"",
            OnFail:"",
            Data:"",
        }
        m.Start=start.bind(m)
        return m
    }
    app.Data.Move=null
    app.Data.PendingMove=null
    var start=function(){
        var walk=this
        if (app.Data.Move==null){
            app.Data.Move=walk
        }else{
            app.Data.PendingMove=walk
        }
        switch (walk.Mode){
            case "walk":
            break
            case "run":
            break
            case "locate":
            break
            default:
                throw "app.Move:Mode["+walk.Mode+"]无效"
  
        }
    }
    app.NewMove=function(mode,target,onFinish,data){
        var move=newMove()
        move.Target=target
        move.Mode=mode?mode:"walk"
        move.OnFinish=onFinish?onFinish:""
        move.Data=data?data:""
        return move
    }
})(App)