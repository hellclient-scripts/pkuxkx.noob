(function (app) {
    let walk = Include("include/walk.js")
    let Move = Include("core/move/move.js")
    var backward = Include("include/backward.js")
    let Walk = function (mode, target, onFinish, options) {
        Move.call(this, mode, target, onFinish, options)
        this.Finish=function(){
            this.Stop()
            world.Note("到达目的地")
            app.ExecuteCallback(this.OnFinish, this.Data)
            return
        }
        this.Move = function () {
            if (this.Context.Path.Length() == 0) {
                this.Finish()
                return
            }
            let step
            while (true) {
                step = this.Context.Move()
                if (step == null) {
                    break
                }
                if (!backward[step.Command]) {
                    break
                }
                if (this.Context.Current() && !backward[this.Context.Current().Command]) {
                    break
                }
                if (this.Context.Moving.length >= app.GetNumberParam("walkstep")) {
                    break
                }
            }
            this.Context.Moving.forEach(function (step) {
                app.Send(step.Command)
            })
        }
        this.OnStart = function () {
            if (!app.Data.Room.ID) {
                this.Stop()
                app.Raise("MoveLost",this)
                return
            }
            if (app.Data.Room.ID==this.Target){
                this.Finish()
                return 
            }
            var target = this.Target
            if (typeof (target) == "string") {
                target = [target]
            }
            var path = App.API.GetPath(app.Data.Room.ID, target)
            if (path == null) {
                this.Stop()
                world.Note("无法找到从[" + app.Data.Room.ID + "]到[" + target.join(",") + "]的路径")
                app.Raise("MoveNopath")
                return
            }
            this.Context = new walk(path.Path)
            this.Move()
        }
        this.Resume = function () {
            if (this.Paused) {
                this.Paused = false
            }
            this.Move()
        }
        this.Retry=function(){
            world.DoAfterSpecial(0.1, 'App.Data.Move.RetryMove()', 12);
        }
        this.RetryMove=function(){
            this.TryMove(this.Context.NextStep())
        }
        this.OnRoomObjEnd = function () {
            if (this.Ignore){
                this.Ignore=false
                return;
            }
            this.Context.Arrive()
            if (!this.Paused && this.OnStep) {
                app.ExecuteCallback(this.OnStep, this.StepData)
            }
            if (!this.Paused && this.Context.Moving.length == 0) {
                this.Move()
            }
        }
    }
    return Walk;
})(App)