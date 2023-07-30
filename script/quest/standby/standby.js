(function (App) {
    App.Quest.Standby = {}
    App.Quest.Standby.Location = ""
    App.Quest.Standby.Delay = 0
    App.Quest.Standby.Commands = ""
    App.Quest.Standby.Start = function (cmd) {
        App.Quest.Standby.Location = ""
        App.Quest.Standby.Delay = 0
        App.Quest.Standby.Command = ""
        let data = cmd.split("::")
        if (data.length > 0) {
            App.Quest.Standby.Location = data[0]
        }
        if (data.length > 1) {
            App.Quest.Standby.Delay = data[1]
        }
        if (data.length > 2) {
            App.Quest.Standby.Command = data.slice(2).join(";")
        }
        if (!App.Quest.Standby.Location) {
            App.Quest.Standby.Location = App.GetSafeRoom()
        }
        if (!App.Quest.Standby.Delay&&!App.Quest.Standby.Command) {
            App.Quest.Standby.Delay = 60
        }
        if (App.Quest.Standby.Command){
            App.Commands([
                App.NewCommand('prepare', App.PrapareFull),
                App.NewCommand('to', App.Options.NewWalk(App.Quest.Standby.Location)),
                App.NewCommand("nobusy"),
                App.NewCommand("do",App.Quest.Standby.Command),
                App.NewCommand("nobusy"),
                App.NewCommand('idle', App.Quest.Standby.Delay),
                App.NewCommand("function", function () {
                    App.Raise("quests.loop")
                    App.Raise("core.looping")
                    App.Next()
                })
            ]).Push()
        }else{
            App.Commands([
                App.NewCommand('prepare', App.PrapareFull),
                App.NewCommand('to', App.Options.NewWalk(App.Quest.Standby.Location)),
                App.NewCommand('delay', App.Quest.Standby.Delay),
                App.NewCommand("function", function () {
                    App.Raise("quests.loop")
                    App.Raise("core.looping")
                    App.Next()
                })
            ]).Push()
        }
        App.Next()
    }
})(App)