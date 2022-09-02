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
    }
    Move.prototype.Push = function (final) {
        App.Automaton.Push(["core.state.move.start"], final)
        App.SetContext("Move", this)
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
        App.Automaton.Push([], final)
        this.Data.Found=false
        if (this.Data.Skip){
            this.Data.Skip()
        }
        App.SetContext("Move", this)
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