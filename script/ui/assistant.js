(function (app) {
    App.UIAssistant=[]
    App.RegisterAssistant=function (id,label,script,position) {
        App.UIAssistant.push({
            ID:id,
            Label:label,
            Script:script,
            Position:position,
        })
    }
    App.UIAssistantShow = function () {
        var list = Userinput.newlist("助理", "请选择你需要的帮助", false)
        if (!App.AuthCheck()){
            App.Auth()
            return
        }
        App.UIAssistant.sort(function(a, b) {
            return a.Position - b.Position;
          });
        App.UIAssistant.forEach(function(data){
            list.append(data.ID,data.Label)
        })      
        list.publish("App.UIAssistantExecute")
    }
    App.UIAssistantExecute = function (name, id, code, data) {
        if (code == 0 && data) {
            for(let key in App.UIAssistant){
                if (App.UIAssistant[key].ID==data){
                    App.UIAssistant[key].Script()
                    return 
                }
            }
        }
    }
})(App)