(function (App) {
    let Action = Include("include/action.js")
    App.Core.Plan = {}
    App.Core.Plan.Current = ""
    App.Core.Plan.Details = {}
    App.Core.Plan.Match=function(data){
        if (!data){
            return true
        }
        return App.Core.Condition.Match(data)
    }
    App.Core.Plan.LoadActions = function (data) {
        let lines = data.split("\n")
        let result = []
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i].trim()
            if (line) {
                let action = new Action(line)
                if (action.Command){
                    result.push(action)
                }                   
            }
        }
        return result
    }
    App.Core.Plan.Execute = function (event, details) {
        if (!details) {
            details = []
        }
        Note("执行plan 事件[" + event + "] 细节detail [" + details.join(",") + "]")
        App.Core.Plan.Current = event
        App.Core.Plan.Details = {}
        for (var i = 0; i < details.length; i++) {
            if (details[i]) {
                App.Core.Plan.Details[details[i]] = true
            }
        }
        let actions=App.Core.Plan.LoadActions(world.GetVariable("plan"))
        for (var i = 0; i < actions.length; i++) {
            let action = actions[i]
            if (action.Command==event&&App.Core.Plan.Match(action.ConditionsLine)){
                Note("匹配到计划" + action.Line)
                App.Send(action.Data)
                return
            }
        }
    }
})(App)