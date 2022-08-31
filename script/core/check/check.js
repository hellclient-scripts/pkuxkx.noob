(function (App) {
    let Check = function (id) {
        if (!id) {
            throw "Check的id不能为空"
        }
        this.ID = id
        this.Level = 0
        this.Command = ""
        this.IntervalParam = ""
        this.LastID = ""
        this.Send=function(){
            if (typeof(this.Command)=="function"){
                this.Command()
            }else{
                App.Send(this.Command)
            }
        }
    }
    Check.prototype.WithLevel = function (level) {
        this.Level = level
        return this
    }
    Check.prototype.WithCommand = function (command) {
        this.Command = command
        return this
    }
    Check.prototype.WithIntervalParam = function (param) {
        this.IntervalParam = param
        return this
    }
    Check.prototype.WithLastID = function (id) {
        this.LastID = id
        return this
    }
    Check.prototype.Execute = function (force) {
        if (!force) {
            if (this.IntervalParam && this.LastID) {
                if (!After(App.Data[this.LastID], App.GetNumberParam(this.IntervalParam))) {
                    return false
                }
            }
        }
        this.Send()
        App.Data[this.LastID]=Now()
        return true
    }
    Check.prototype.Callback = function () {
        let self=this
        return function (data) {
            if (self.Level < data.Level) {
                return false
            }
            if (data.ID) {
                if (data.ID == this.ID) {
                    return self.Execute(true)
                }
                return false
            }
            return self.Execute(false)
        }
    }
    return Check
})(App)