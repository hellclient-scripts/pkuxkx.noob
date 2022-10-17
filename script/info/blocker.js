(function (App) {
    App.Info.Blockers={}
    App.Info.LoadBlockerLines=function(lines){
        lines.forEach(function(line){
            line=line.trim()
            if (line==""||line.startsWith("//")){
                return
            }
            let data=line.split("||")
            if (data.length<3){
                throw "blocker ["+line+"]格式错误"
            }
            let blocker={
                Name:data[0],
                Cmd:data[1],
                Exp:data[2]-0,
            }
            App.Info.Blockers[blocker.Name]=blocker
        })
    }
    App.RegisterCallback("info.presets.loadblockers", function () {
        world.Note("加载拦路人")
        let data=world.ReadLines("info/data/blockers.txt")
        App.Info.LoadBlockerLines(data)
    })
    App.Bind("Init", "info.presets.loadblockers")

})(App)