
(function(App){
    App.Core.Ask={}
    App.Core.Ask.LastNPC=""
    App.Core.Ask.LastQuestion=""
    App.Data.Ask={}
    App.Core.Ask.MaxReply=10
    App.Core.AskQuestion=function(npc,question){
        App.Core.Ask.LastNPC=npc
        App.Core.Ask.LastQuestion=question
        App.Send("ask "+npc+" about "+question)
    }
    App.PushAsk=function(question){
        App.Push(["core.ask"]).WithData("Question",question)
    }
    App.Core.Ask.RetryAsk=function(){
        if (App.Core.Ask.LastNPC && App.Core.Ask.LastQuestion){
            App.Send("ask "+App.Core.Ask.LastNPC+" about "+App.Core.Ask.LastQuestion)
        }
    }
    App.Core.Ask.OnAskLater=function(name, output, wildcards){
        world.DoAfterSpecial(1, 'App.Core.Ask.RetryAsk()', 12);
    }
    App.Core.Ask.OnAsk=function(name, output, wildcards){
        App.Data.Ask.Replies=[]
        App.Data.Ask.Lines=[]
        App.Data.Ask.Time=Now()
        App.Core.Ask.LastNPC=""
        App.Core.Ask.LastQuestion=""
        App.Data.Ask.NPC=wildcards[0]
        App.Data.Ask.Question=wildcards[1]
        world.EnableTriggerGroup("core.ask.reply",true)
    }
    App.Core.Ask.OnReply=function(name, output, wildcards){
        if (App.Data.Ask.Replies.length>=App.Core.Ask.MaxReply){
            world.EnableTriggerGroup("core.ask.reply",false)
        }else{
            App.Data.Ask.Replies.push(output)
            App.Data.Ask.Lines.push(JSON.parse(DumpOutput(1))[0])
        }
        App.Raise("core.reply")
        App.RaiseStateEvent("core.reply")
    }
    App.Core.Ask.NoMoreReply=function(){
        world.EnableTriggerGroup("core.ask.reply",false)
    }
    world.EnableTriggerGroup("core.ask.reply",false)
    App.RegisterState(new (Include("core/state/ask/ask.js"))())
    })(App)