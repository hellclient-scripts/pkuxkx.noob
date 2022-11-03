(function (App) {
    App.UIAssistant = []
    App.RegisterAssistant = function (id, label, script, position) {
        App.UIAssistant.push({
            ID: id,
            Label: label,
            Script: script,
            Position: position,
        })
    }
    App.UIAssistantShow = function () {
        var list = Userinput.newlist("助理", "请选择你需要的帮助", false)
        if (!App.AuthCheck()) {
            App.Auth()
            return
        }
        App.UIAssistant.sort(function (a, b) {
            return a.Position - b.Position;
        });
        App.UIAssistant.forEach(function (data) {
            list.append(data.ID, data.Label)
        })
        if (App.Data.Afk) {
            list.append("afk.here", "取消暂离(#here)")
        } else {
            list.append("afk.afk", "暂离(#afk)")
        }
        list.publish("App.UIAssistantExecute")
    }
    App.UIAssistantExecute = function (name, id, code, data) {
        if (code == 0 && data) {
            switch (data) {
                case "afk.here":
                    App.SetAfk(false)
                    break
                case "afk.afk":
                    App.SetAfk(true)
                    break
                default:
                    for (let key in App.UIAssistant) {
                        if (App.UIAssistant[key].ID == data) {
                            App.UIAssistant[key].Script()
                            return
                        }
                    }
            }
        }
    }
})(App)