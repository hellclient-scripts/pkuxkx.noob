(function (App) {
    const max = 30
    App.Core.Overheat = {}
    App.Core.Overheat.Last = []
    App.Core.Overheat.LasfBuffFull=Now()
    App.Bind("core.bufffull","core.overhead.onbufffull")
    App.RegisterCallback("core.overhead.onbufffull",function(){
        App.Core.Overheat.LasfBuffFull=Now()
    })
    App.Core.Overheat.Commands = {
        "west": 11,
        "w": 11,
        "north": 11,
        "n": 11,
        "east": 11,
        "e": 11,
        "south": 11,
        "s": 11,
        "up": 11,
        "u": 11,
        "down": 11,
        "d": 11,
        "enter": 11,
        "out": 11,
        "xiaojing": 11,
        "biandao": 11,
        "northeast": 11,
        "ne": 11,
        "southeast": 11,
        "se": 11,
        "southwest": 11,
        "sw": 11,
        "northwest": 11,
        "nw": 11,
        "northup": 11,
        "nu": 11,
        "eastup": 11,
        "eu": 11,
        "southup": 11,
        "su": 11,
        "westup": 11,
        "wu": 11,
        "northdown": 11,
        "nd": 11,
        "eastdown": 11,
        "ed": 11,
        "southdown": 11,
        "sd": 11,
        "westdown": 11,
        "eu": 11,
        "i": 15,
        "i2": 67,
        "l": 8,
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