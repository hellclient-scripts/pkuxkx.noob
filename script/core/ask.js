
(function (App) {
    App.Core.Ask = {}
    App.Core.Ask.LastNPC = ""
    App.Core.Ask.LastQuestion = ""
    App.Data.Ask = {}
    App.Core.Ask.MaxReply = 50
    App.Core.AskQuestion = function (npc, question) {
        world.EnableTriggerGroup("core.ask.reply", false)
        App.Data.Ask.Replies = []
        App.Data.Ask.Lines = []
        App.Core.Ask.LastNPC = npc
        App.Core.Ask.LastQuestion = question
        App.Send("ask " + npc + " about " + question)
    }
    App.PushAsk = function (question) {
        App.Push(["core.ask"]).WithData("Question", question)
    }
    App.Core.Ask.RetryAsk = function () {
        if (App.Core.Ask.LastNPC && App.Core.Ask.LastQuestion) {
            App.Send("ask " + App.Core.Ask.LastNPC + " about " + App.Core.Ask.LastQuestion)
        }
    }
    App.Core.Ask.OnAskLater = function (name, output, wildcards) {
        Note("重新提问")
        world.EnableTriggerGroup("core.ask.reply", false)
        world.DoAfterSpecial(1, 'App.Core.Ask.RetryAsk()', 12);
    }
    App.Core.Ask.OnAsk = function (name, output, wildcards) {
        App.Data.Ask.Replies = []
        App.Data.Ask.Lines = []
        App.Data.Ask.Time = Now()
        App.Core.Ask.LastNPC = ""
        App.Core.Ask.LastQuestion = ""
        App.Data.Ask.NPC = wildcards[0]
        App.Data.Ask.Question = wildcards[1]
        App.Raise("ask")
        world.EnableTriggerGroup("core.ask.reply", true)
    }
    let npcfaintre = /^但是很显然的，.+现在的状况没有办法给你任何答覆。$/
    App.Core.Ask.OnReply = function (name, output, wildcards) {
        if (output == "你说话太快，对方听不懂，慢点说吧。") {
            return
        }
        if (App.Data.Ask.Replies.length == 0 && output.match(npcfaintre)) {
            world.EnableTriggerGroup("core.ask.reply", false)
            App.RaiseStateEvent("core.ask.faint")
            return
        }
        if (App.Data.Ask.Replies.length > App.Core.Ask.MaxReply) {
            world.EnableTriggerGroup("core.ask.reply", false)
            return
        } else {
            App.Data.Ask.Replies.push(output)
            App.Data.Ask.Lines.push(JSON.parse(DumpOutput(1))[0])
        }
        App.Raise("core.reply")
        App.RaiseStateEvent("core.reply", output)
    }
    App.Core.Ask.UnknownRelist=[
        /.*说道：没听说过。$/,
        /.*说道：我从没听说过这事。$/,
        /.*说道：你去问别人吧。$/,
        /.*显然不知道你在说什么。$/,
        /.*很抱歉地说：无可奉告。$/,
        /.*这我可不清楚，你最好问问别人吧。$/,
        /.*说道：对不起，你问的事我实在没有印象。$/,
        /.*说道：对不起。又接着忙自己的事去了。$/,
        /.*说道：没看我正忙着吗？$/,
        /.*很抱歉地说：我对闲谈不感兴趣。$/,

    ]
    App.Core.Ask.IsUnkonwReplay=function(){
        if (App.Data.Ask.Replies.length==0){
            return true;
        }
        for (var i=0;i<App.Core.Ask.UnknownRelist.length;i++){
            if (App.Data.Ask.Replies[0].match(App.Core.Ask.UnknownRelist[i])){
                return true
            }
        }
        return false;
    }
    App.Core.Ask.OnAnimalReply=function(name, output, wildcards){
        App.Data.Ask.Replies = []
        App.Data.Ask.Lines = []
        App.Data.Ask.Time = Now()
        App.Core.Ask.LastNPC = ""
        App.Core.Ask.LastQuestion = ""
        App.Data.Ask.NPC = wildcards[0]
        App.Data.Ask.Question = ""
        world.EnableTriggerGroup("core.ask.reply", false)
        App.RaiseStateEvent("core.reply.animal", output)
    }
    App.Core.Ask.NoMoreReply = function () {
        world.EnableTriggerGroup("core.ask.reply", false)
    }
    world.EnableTriggerGroup("core.ask.reply", false)
    App.RegisterState(new (Include("core/state/ask/ask.js"))())
})(App)