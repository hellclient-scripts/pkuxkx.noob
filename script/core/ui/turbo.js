(function (App) {
    App.CoreUITurboShowList = function () {
        var list = Userinput.newlist("请选择你需要超频的时间", "请选择你需要超频的时间")
        list.append("30", "30分钟")
        list.append("60", "1小时")
        list.append("120", "2小时")
        list.append("240", "4小时")
        list.append("480", "8小时")
        list.append("960", "12小时")
        list.append("1440", "24小时")
        list.append("2880", "48小时")
        list.publish("App.CoreUITurbo")
    }
    App.CoreUITurbo = function (name, id, code, data) {
        if (code == 0 && data) {
            App.Core.Afk.SetTurboBefore(data*60)
        }
    }
    App.RegisterAssistant("turbo", "超频", App.CoreUITurboShowList, 100)
})(App)
