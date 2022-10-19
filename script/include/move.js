(function (App) {

    let Move = function (mode, target, data) {
        this.Mode = mode
        this.Target = target
        this.Current = null
        this.Data = data ? data : {}
        this.Context = null
        this.StateOnStep = ""
        this.Stopped = false
        this.OnRoom = ""
        this.StartCmd = ""
        this.FromRoom = ""
        this.Ignore = false
        this.Vehicle = ""
        this.LastMaze=""
        this.LastRoomID=""
        this.Retried=0
        this.FinalState=""
    }
    Move.prototype.Push = function (final) {
        this.FinalState=final
        App.Automaton.Push(["core.state.move.start"], final)
        App.SetContext("Move", this)
    }
    Move.prototype.Retry=function(max){
        if (this.Retried<max){
            this.Retried++
            App.Automaton.Push(["core.state.move.start"], this.FinalState)
            App.Next()
        }else{
            Note("超过最大移动重试次数，放弃。")
            App.Fail()
        }
    }
    Move.prototype.Start = function (final) {
        this.Push(final)
        App.Next()
    }
    Move.prototype.WithData = function (data) {
        this.Data = data
        return this
    }
    Move.prototype.WithVehicle = function (vehicle) {
        this.Vehicle = vehicle
        return this
    }
    Move.prototype.Continue = function (final) {
        if (this.Data.Skip){
            this.Data.Skip()
        }
        this.Finish(final)
    }
    Move.prototype.Finish = function (final) {
        this.Data.Found=false
        App.Automaton.Push([], final)
        App.SetContext("Move", this)
        if (!App.Data.Room.ID){
            App.Data.Room.ID=this.LastRoomID
        }
        App.ChangeState(this.StateOnStep)
    }
    Move.prototype.Stop = function () {
        this.Stopped = true
    }
    Move.prototype.OnMazeStateEvent = function (state, event) {
        if (!this.Current) {
            return false
        }
        let maze = App.Core.Maze.LoadMaze(this.Current.Command)
        if (!maze) {
            return false
        }
        if (maze.IsEscaped(this)) {
            return false
        }
        return maze.OnStateEvent(this, state, event)

    }
    App.RegisterState(new (Include("core/state/move/start.js"))())
    return Move
})(App)