(function(App) {
    App.Core.OnAliasUnknown = function (name, line, wildcards) {
        let cmd=line.slice(1).split(" ")[0]
        let quest=App.Core.Quest.Quests[cmd]
        if (!quest){
            Note("未知的别名 "+line)
        }else{
            Note("找到任务 "+cmd+",执行")
            App.NewCommand('quest', line.slice(1)).Push()
            App.Next()
        }
    }
})(App)
