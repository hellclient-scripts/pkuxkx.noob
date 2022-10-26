(function (App) {
    App.Core.Buff = {}
    App.Core.Buff.Unknown = null
    App.Core.Buff.Unavailable = 1
    App.Core.Buff.Off = 2
    App.Core.Buff.On = 3
    App.Core.Buff.ToggleValues = {}
    App.Core.Buff.ToggleCommands = {}
    let DefaultCondition = function () {
        return true
    }
    App.Core.Buff.RegisterToggle = function (name, cmd_on, cmd_off, auto, condition) {
        App.Core.Buff.ToggleCommands[name] = {
            CmdOn: cmd_on,
            CmdOff: cmd_off,
            Auto: auto,
            Condition: condition || DefaultCondition,
        }
    }
    App.Core.Buff.RegisterToggle("zyhb", "yun zyhb", "yun zyhb", App.Core.Buff.Off)
    App.Toggle = function (name, on) {
        let cmd = App.Core.Buff.ToggleCommands[name]
        if (cmd && cmd.Condition()) {
            if (on) {
                if (App.Core.Buff.ToggleValues[name] == App.Core.Buff.Off) {
                    App.Send(cmd.CmdOn)
                }
            } else {
                if (App.Core.Buff.ToggleValues[name] == App.Core.Buff.On) {
                    App.Send(cmd.CmdOff)
                }
            }
        }
    }
    App.Core.Buff.AutoToggle = function () {
        for (var name in App.Core.Buff.ToggleCommands) {
            if (App.Core.Buff.ToggleCommands[name].Condition() && App.Core.Buff.ToggleCommands[name].Auto!=null) {
                App.Toggle(name, App.Core.Buff.ToggleCommands[name].Auto==App.Core.Buff.On)
            }
        }
        App.Next()
    }
    let needauto = function (name) {
        if (App.Core.Buff.ToggleCommands[name].Condition()&&App.Core.Buff.ToggleCommands[name].Auto!=null) {
            switch (App.Core.Buff.ToggleValues[name]) {
                case App.Core.Buff.On:
                    return App.Core.Buff.ToggleCommands[name].Auto==App.Core.Buff.Off
                case App.Core.Buff.Off:
                    return App.Core.Buff.ToggleCommands[name].Auto==App.Core.Buff.On
            }
        }
        return false
    }
    App.Core.Buff.NeedToggleOff = function () {
        for (var name in App.Core.Buff.ToggleCommands) {
            if (needauto(name)) {
                return true
            }
        }
        return false
    }
    App.Core.Buff.CheckAll = function () {
        for (var name in App.Core.Buff.ToggleCommands) {
            if (App.Core.Buff.ToggleCommands[name].Condition()) {
                App.Send(App.Core.Buff.ToggleCommands[name].CmdOff)
                App.Response("core", "buffcheck", name)
            }
        }
    }
    App.RegisterCallback("core.buff.check", function (data) {
        if (App.Core.Buff.ToggleCommands[data] && App.Core.Buff.ToggleValues[data] == App.Core.Buff.Unknown) {
            App.Core.Buff.ToggleValues[data] = App.Core.Buff.Unavailable
        }
    })
    App.Core.Buff.OnToggleOn = function (name, output, wildcards) {
        App.Core.Buff.ToggleValues[name.split(".").slice(-1)] = App.Core.Buff.On
    }
    App.Core.Buff.OnToggleOff = function (name, output, wildcards) {
        App.Core.Buff.ToggleValues[name.split(".").slice(-1)] = App.Core.Buff.Off
    }
    App.Core.Buff.OnToggleUnavailable = function (name, output, wildcards) {
        App.Core.Buff.ToggleValues[name.split(".").slice(-1)] = App.Core.Buff.Unavailable
    }
    App.Bind("Response.core.buffcheck", "core.buff.check")

})(App)
