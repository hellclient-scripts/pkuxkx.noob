(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.maze.wdxs"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        App.Go("sd")
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "move.notallowed":
            let automaton=App.GetContext("Automaton")
            App.Commands([
                App.NewCommand("do","n;ask song yuanqiao about 下山;s"),
                App.NewCommand("function",function(){
                    App.Push(["core.state.maze.wdxs"]).WithData("Automaton",automaton)
                    App.Next()
                }),
            ]).Push()
            App.Next()
            break;
        case "move.onRoomObjEnd":
            if (App.Data.Room.Name=="紫霄宫"){
                let automaton=App.GetContext("Automaton")
                App.Automaton.Import(automaton)
                App.RaiseStateEvent(context,event,data)
            }
            break
        }
    }
    return State
})(App)