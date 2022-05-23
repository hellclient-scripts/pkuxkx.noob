(function (app) {
    app.UIAssistant=[]
    app.RegisterAssistant=function (id,label,script,position) {
        app.UIAssistant.push({
            ID:id,
            Label:label,
            Script:script,
            Position:position,
        })
    }
    app.UIAssistantShow = function () {
        var list = Userinput.newlist("助理", "请选择你需要的帮助", false)
        if (!app.AuthCheck()){
            app.Auth()
            return
        }
        app.UIAssistant.sort(function(a, b) {
            return a.Position - b.Position;
          });
        app.UIAssistant.forEach(function(data){
            list.append(data.ID,data.Label)
        })      
        list.publish("App.UIAssistantExecute")
    }
    app.UIAssistantExecute = function (name, id, code, data) {
        if (code == 0 && data) {
            for(let key in app.UIAssistant){
                if (app.UIAssistant[key].ID==data){
                    app.UIAssistant[key].Script()
                    return 
                }
            }
        }
    }
})(App)