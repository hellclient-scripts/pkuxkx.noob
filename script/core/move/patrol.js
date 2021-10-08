(function (app) {
    let patrol = Include("include/patrol.js")
    let Move = Include("core/move/move.js")
    let Patrol = function (mode, target, onFinish, options) {
        Move.call(this, mode, target, onFinish, options)
        this.Move = function () {
            this.Current = this.Context.Move()
            if (this.Current == null) {
                this.Stop()
                world.Note("巡查完毕")
                app.ExecuteCallback(this.OnFinish, this.Data)
                return
            }
            this.TryMove()
        }
        this.OnStart = function () {
            this.Context = new patrol(this.Target)
            App.Send("l")
        }
        this.Resume = function () {
            if (this.Paused) {
                this.Paused = false
            }
            this.Move()
        }
        this.Retry=function(){
            world.DoAfterSpecial(app.Vehicle.RetryInterval, 'App.Data.Move.RetryMove()', 12);
        }
        this.RetryMove=function(){
            this.TryMove()
        }
        this.OnRoomObjEnd = function () {
            if (this.Ignore){
                this.Ignore=false
                return;
            }
            app.Raise("MoveArrive",this.Context.NextStep())
            if (this.OnStep && !app.ExecuteCallback(this.OnStep, this.StepData)) {
                this.Pause()
                return
            }
            this.Move()
        }
    }
    return Patrol;
})(App)