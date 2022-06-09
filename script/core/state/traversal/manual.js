(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.traversal.manual"

    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.Enter=function(context,oldstatue){
        if (!App.Data.Traversal.Type){
            this.PickType()
        }else if(!App.Data.Traversal.Target){
            this.PromptTargetText()
        }else if(!App.Data.Traversal.Answer){
            this.Show()
        }else{
            App.Core.Traversal.Start()
        }
    }
    State.prototype.Leave=function(context,oldstatue){
        Userinput.hideall()
    }
    State.prototype.PickType=function(){
        App.Core.Traversal.PickType("traversal.manual.type","选择遍历类型","请选择你要进行的遍历的类型")
    }
    State.prototype.PromptTargetText=function(){
        App.Core.Traversal.PromptTargetText("traversal.manual.target","选择遍历目标","请选择你要进行的遍历的目标,为空取消")
    }
    State.prototype.Show=function(){
        App.Core.Traversal.Show("traversal.manual.show","选择遍历路径","请选择你要进行的遍历的路径")                
    }
    State.prototype.OnEvent = function (context, event, data) {
        switch (event) {
            case "core.traversal.type":
                if (!App.Data.Traversal.Type){
                    App.Fail()
                    return
                }
                this.PromptTargetText()
                break
            case "core.traversal.answer":
                if (!App.Data.Traversal.Answer){
                    App.Fail()
                    return
                }
                App.Core.Traversal.Start()
                break
            case "core.traversal.target":
                if (!App.Data.Traversal.Target){
                    App.Fail()
                    return
                }
                this.Show()                
                break
            default:
                basicstate.prototype.OnEvent.call(this, context, event, data)
        }
    }
    return State
})(App)