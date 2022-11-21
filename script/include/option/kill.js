(function (App) {
    let Kill = function (cmd, type, before, after) {
        this.Cmd = cmd
        this.Type = type
        this.Before = before
        this.After = after
        this.Online = null
        //战斗跳开自动判断，使用自定义结束行
        this.FinishLine=""
        this.OnNpcFlee = null
        this.HaltCurrent = 0
        this.HaltWound = 0
        this.StrategyList=[]
    }
    Kill.prototype.WithFinishLine=function(finishline){
        this.FinishLine=finishline
        return this
    }
    Kill.prototype.WithStrategyList=function(strategyList){
        this.StrategyList=strategyList||[]
        return this
    }
    return Kill
})(App)