(function (app) {
    app.UIAssistantShow = function () {
        var list = Userinput.newlist("助理", "请选择你需要的帮助", false)
        list.append("to", "前往地点")
        list.send("App.UIAssistantExecute")
    }
    app.UIAssistantExecute = function (name, id, code, data) {
        if (code==0 && data) {
            switch (data) {
                case "to":
                    world.Note("to")
                app.UIToShowList()
                break
            }
        }
    }
})(App)