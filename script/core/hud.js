(function(App){
    App.Core.HUD={}
    App.Core.HUD.Mode="0"//"":聊天模式,"simple":极简模式,"quest"2:任务简报
    App.Core.HUD.ChatHistory=[]
    App.Core.HUD.MaxChatHistory=16
    App.Core.HUD.InitHUD=function(){
        App.Core.HUD.Mode=world.GetVariable("HUDMode")
        let line=JSON.parse(NewLine())
        let word=JSON.parse(NewWord("HUD面板 "))
        word.Bold=true
        word.Color="Cyan"
        line.Words.push(word)
        switch (App.Core.HUD.Mode){
            case "quest":
                SetHUDSize(9)
                word=JSON.parse(NewWord("任务简报"))
                word.Color="Bright-White"
                line.Words.push(word)
                UpdateHUD(0,JSON.stringify([line]))
                break
            case "simple":
                SetHUDSize(1)
                word=JSON.parse(NewWord("极简模式"))
                word.Color="Bright-White"
                line.Words.push(word)
                UpdateHUD(0,JSON.stringify([line]))
    
                break
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
    App.Bind("onHUDClick","App.Core.HUD.OnClick")
    App.RegisterCallback("App.Core.HUD.OnClick",function(click){
        var List = Userinput.newlist("类型", "更改HUD类型", false)
        List.append("", "聊天模式")
        List.append("simple", "极简模式")
        List.append("quest", "任务简报")
        List.publish("App.Core.HUD.ChangeMode")
    })
    App.Core.HUD.ChangeMode=function(name,id,code,data){
        if (code==0){
            world.SetVariable("HUDMode",data)
            App.Core.HUD.InitHUD()
            Userinput.Popup("","修改生效","修改已生效，记得保存你的设置")
        }
    }
})(App)