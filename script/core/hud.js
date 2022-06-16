(function(App){
    App.Core.HUD={}
    App.Core.HUD.Mode=0//0:聊天模式,1:极简模式,2:任务简报
    App.Core.HUD.ChatHistory=[]
    App.Core.HUD.MaxChatHistory=16
    App.Core.HUD.InitHUD=function(){
        let line=JSON.parse(NewLine())
        let word=JSON.parse(NewWord("HUD面板 "))
        word.Bold=true
        word.Color="Cyan"
        line.Words.push(word)
        switch (App.Core.HUD.Mode){
            default:
            word=JSON.parse(NewWord("聊天模式"))
            word.Color="Bright-White"
            line.Words.push(word)
            SetHUDSize(App.Core.HUD.MaxChatHistory+1)    
            UpdateHUD(0,JSON.stringify([line]))
        }
    }
    App.Core.HUD.InitHUD()

    App.Core.HUD.OnChat=function(name, output, wildcards){
        if (App.Core.HUD.Mode==0){
            App.Core.HUD.ChatHistory=App.Core.HUD.ChatHistory.concat(JSON.parse(DumpOutput(1)))
            if (App.Core.HUD.ChatHistory.length>App.Core.HUD.MaxChatHistory){
                App.Core.HUD.ChatHistory=App.Core.HUD.ChatHistory.slice(-App.Core.HUD.MaxChatHistory)
            }
            UpdateHUD(1,JSON.stringify(App.Core.HUD.ChatHistory))
        }
    }
    App.Core.HUD.OnAvatarStart=function(name, output, wildcards){

    }
    App.Core.HUD.OnAvatarEnd=function(name, output, wildcards){

    }
})(App)