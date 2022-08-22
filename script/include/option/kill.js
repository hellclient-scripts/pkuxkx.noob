(function (App) {
    let Kill = function (cmd, type, before, after) {
        this.Cmd = cmd
        this.Type = type
        this.Before = before
        this.After = after
        this.Online = null
        this.OnNpcFlee = null
        this.HaltCurrent = 0
        this.HaltWound = 0
    }
    return Kill
})(App)