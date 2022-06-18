(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.ask"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        let q=App.GetContext("Question")
        App.Core.AskQuestion(q.NPC,q.Question)
    }
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "core.reply":
            let q=App.GetContext("Question")
            if (App.Data.Ask.Replies.length>=q.Length){
                App.Core.Ask.NoMoreReply()
                App.Next()
            }
            break;
        case "core.nothere":
            App.Fail()
            break
        }
    }
    return State
})(App)