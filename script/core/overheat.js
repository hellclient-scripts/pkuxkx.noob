(function (App) {
    const max = 30
    App.Core.Overheat = {}
    App.Core.Overheat.Last = []
    App.Core.Overheat.LasfBuffFull=Now()
    App.Bind("core.bufffull","core.overhead.onbufffull")
    App.Bind("core.topcmd","core.overhead.onbufffull")
    
    App.RegisterCallback("core.overhead.onbufffull",function(){
        App.Core.Overheat.LasfBuffFull=Now()
    })
    App.Core.Overheat.Commands = {
        "west": 13,
        "w": 13,
        "north": 13,
        "n": 13,
        "east": 13,
        "e": 13,
        "south": 13,
        "s": 13,
        "up": 13,
        "u": 13,
        "down": 13,
        "d": 13,
        "enter": 13,
        "out": 13,
        "xiaojing": 13,
        "biandao": 13,
        "northeast": 13,
        "ne": 13,
        "southeast": 13,
        "se": 13,
        "southwest": 13,
        "sw": 13,
        "northwest": 13,
        "nw": 13,
        "northup": 13,
        "nu": 13,
        "eastup": 13,
        "eu": 13,
        "southup": 13,
        "su": 13,
        "westup": 13,
        "wu": 13,
        "northdown": 13,
        "nd": 13,
        "eastdown": 13,
        "ed": 13,
        "southdown": 13,
        "sd": 13,
        "westdown": 13,
        "eu": 13,
        "i": 15,
        "i2": 8,
        "l": 19,
        "ask":50,
        "jq":160,
        "wield":5,
        "jifa":4,
        "skills":123,
    }
    App.Core.Overheat.Value = 0
    App.Core.Overheat.Current = 0
    App.Core.Overheat.IsOverThreshold = function () {
        return App.Core.Overheat.Value > App.GetNumberParam("overheat_threshold")
    }
    App.Core.Overheat.OnTimer = function () {
        App.Core.Overheat.Last.unshift(App.Core.Overheat.Current)
        if (App.Core.Overheat.Last.length > max) {
            App.Core.Overheat.Last = App.Core.Overheat.Last.slice(0, -1)
        }
        App.Core.Overheat.Last = [...App.Core.Overheat.Last]
        App.Core.Overheat.Value = 0
        if (App.Core.Overheat.Last.length) {
            for (var i = 0; i < App.Core.Overheat.Last.length; i++) {
                App.Core.Overheat.Value += App.Core.Overheat.Last[i]
            }
            App.Core.Overheat.Value=Math.floor(App.Core.Overheat.Value/App.Core.Overheat.Last.length)
        }
        App.Core.Overheat.Current = 0
        App.Raise("core.overheat.updated", App.Core.Overheat.Value)
    }
    App.RegisterCallback("app.core.overheat.onsend", function (data) {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                let v = App.Core.Overheat.Commands[data[i]]
                if (v) {
                    App.Core.Overheat.Current += v
                }
            }
        }
    })
    App.Bind("Send", "app.core.overheat.onsend")

}(App))