(function (App) {
    App.Quest.Keeper = {}
    App.Quest.Keeper.Location = ""
    App.Quest.Keeper.Delay = 0
    App.RegisterProposalGroup("core.quest.keeper.prepare",[
        "silver",
        "cash",
        "cun",
        "sell",
        "coin",
        "baofu",
        "asset"])
    App.Quest.KeeperPrapareFull=App.Options.NewPrepare(App.CheckLevelFull,["core.quest.keeper.prepare"],true)
    App.Quest.Keeper.Start = function (cmd) {
        App.Quest.Keeper.Location = ""
        App.Quest.Keeper.Delay = 0
        App.Quest.Keeper.Command = ""
        let data = cmd.split("::")
        if (data.length > 0) {
            App.Quest.Keeper.Location = data[0]
        }
        if (data.length > 1) {
            App.Quest.Keeper.Delay = data[1]
        }
        if (!App.Quest.Keeper.Location) {
            App.Quest.Keeper.Location = App.Info.RoomRbz
        }
        if (!App.Quest.Keeper.Delay && !App.Quest.Keeper.Command) {
            App.Quest.Keeper.Delay = 300
        }
        App.Commands([
            App.NewCommand('do', "set no_accept"),
            App.NewCommand('prepare', App.Quest.KeeperPrapareFull),
            App.NewCommand('to', App.Options.NewWalk("yz-rbz")),
            App.NewCommand('do', "unset no_accept"),
            App.NewCommand('idle', App.Quest.Keeper.Delay),
            App.NewCommand("function", function () {
                App.Raise("quests.loop")
                App.Raise("core.looping")
                App.Next()
            })
        ]).Push()
        App.Next()
    }
})(App)