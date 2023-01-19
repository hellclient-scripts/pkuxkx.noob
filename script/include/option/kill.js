(function (App) {
    let Kill = function (cmd, type, before, after) {
        this.Cmd = cmd
        this.Type = type
        this.Before = before
        this.After = after
        this.Online = null
        //战斗跳开自动判断，使用自定义结束行
        this.FinishLine=""
        this.Counter=false
        this.OnNpcFlee = null
        this.HaltCurrent = 0
        this.HaltAfter =0
        this.Wimpy=-1
        this.HaltWound = 0
        this.FirstAid=false
        this.StrategyList=[]
    }
    Kill.prototype.WithCounter=function(counter){
        this.Counter=counter
        return this
    }
    Kill.prototype.WithWimpy=function(wimpy){
        this.Wimpy=wimpy
        return this
    }
    Kill.prototype.WithFirstAid=function(firstaid){
        this.FirstAid=firstaid
        return this
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