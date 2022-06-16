(function(App){
    SetHUDSize(5)
    App.Core.HUD={}
    App.Core.HUD.ChatHistory=[]
    App.Core.HUD.MaxChatHistory=5
    App.Core.HUD.OnChat=function(name, output, wildcards){
        App.Core.HUD.ChatHistory=App.Core.HUD.ChatHistory.concat(JSON.parse(DumpOutput(1)))
        if (App.Core.HUD.ChatHistory.length>App.Core.HUD.MaxChatHistory){
            App.Core.HUD.ChatHistory=App.Core.HUD.ChatHistory.slice(-App.Core.HUD.MaxChatHistory)
        }
        UpdateHUD(0,JSON.stringify(App.Core.HUD.ChatHistory))
    }
})(App)