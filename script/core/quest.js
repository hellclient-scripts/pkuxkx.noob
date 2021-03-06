
(function(App){
    App.Core.Quest={}
    App.Core.Quest.Quests={}
    App.Core.Quest.Cooldowns={}
    App.Core.Quest.Queue=[]
    App.Core.Quest.Remain=[]
    App.RegisterQuest=function(quest){
        let id=quest.ID
        if (!id){
            throw "Quest id不可为空"
        }
        App.Core.Quest.Quests[id]=quest
    }
    App.Core.Quest.Cooldown=function(id,delay){
        App.Core.Quest.Cooldowns[id]=Now()+delay
    }
    App.Core.Quest.Start=function(cmd){
        let data=SplitN(cmd," ",2)
        let id=data[0]
        let param=""
        if (data.length>1){
            param=data[1]
        }
        if (id==""){
            throw "Quest id不可为空"
        }
        let quest=App.Core.Quest.Quests[id]
        if (!quest){
            throw "Quest ["+id+"]未找到"
        }
        let cd=App.Core.Quest.Cooldowns[id]
        if (cd&&!After(cd)){
            App.Fail()
            return
        }
        App.Stopped=false
        quest.Start(param)
    }
    App.Core.Quest.SetQuests=function(queue){
        App.Core.Quest.Queue=[...queue]
        App.Core.Quest.Remain=[...App.Core.Quest.Queue]
    }
    App.Core.Quest.StartQuests=function(quests){
        App.Stopped=false
        App.NewCommand("quests",quests).Push()
        App.Next()
    }
    App.Core.Quest.OnAliasQuests=function (name, line, wildcards){
        App.Core.Quest.StartQuests(wildcards[0].split("||"))
    }
    App.Core.Quest.StartVariable=function(){
        let quests=world.GetVariable("quests").trim()
        if (quests==""){
            Note("quests变量为空")
        }
        App.Core.Quest.StartQuests(quests.split("||"))
    }
    App.Core.OnQuestAliasStart = function (name, line, wildcards) {
        App.Core.Quest.StartVariable()
    }
    if (world.GetVariable("quests")==""){
        Userinput.Popup("","quests变量未设置","设置quests变量后，可以通过#start命令直接开始执行命令")
    }

    App.RegisterState(new (Include("core/state/quests/quests.js"))())
    App.RegisterState(new (Include("core/state/quests/success.js"))())
    App.RegisterState(new (Include("core/state/quests/fail.js"))())

    App.RegisterQuest(new (Include("core/quest/dazuo.js"))())
    App.RegisterQuest(new (Include("core/quest/dz.js"))())
    App.RegisterQuest(new (Include("core/quest/tuna.js"))())
    App.RegisterQuest(new (Include("core/quest/study.js"))())
    App.RegisterQuest(new (Include("core/quest/caiyao.js"))())
    App.RegisterQuest(new (Include("core/quest/caiyaozhuanzhi.js"))())
    App.RegisterQuest(new (Include("core/quest/wd.js"))())
    App.RegisterQuest(new (Include("core/quest/wdj.js"))())

})(App)