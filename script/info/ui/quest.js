(function(App){
    App.InfoUIQuest=function() {
        var list=Userinput.newlist("请选择要执行的任务","任务可以用#quests命令执行，通过||分割，可以设置在quests变量，使用#start快速执行",true)
        for (var key in App.Core.Quest.Quests) {
            list.append(key,key + " - "  +App.Core.Quest.Quests[key].Desc)
        }
        list.publish("App.InfoShowQuest")
    }
    App.InfoShowQuest=function(name,id,code,data){
        if (code==0 && data){
        var list=Userinput.newlist("任务{"+data+"]","任务ID: "+data+"\n简介："+App.Core.Quest.Quests[data].Desc+"\n详情："+App.Core.Quest.Quests[data].Intro)
        list.append(data,"执行")
        list.append("","取消")
        list.publish("App.InfoStartQuest")

        }
    }
    App.InfoStartQuest=function(name,id,code,data){
        if (code==0 && data){
        }
    }
    App.RegisterAssistant("quest","任务",App.InfoUIQuest,30)
})(App)