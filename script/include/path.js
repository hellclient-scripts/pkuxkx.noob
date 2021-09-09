(function(){
    let Step=Include("include/step.js")()
    let Path=function(){
        this.Moving=[]
        this.Steps=[]
    }
    Path.prototype.Push=function(command,target){
        this.PushStep(new Step(command,target))
    }
    Path.prototype.PushStep=function(path){
        this.Steps.push(path)
    }
    Path.prototype.PushCommands=function(commands,target){
        var self=this
        if (commands){
            commands.forEach(function(cmd){
                self.Push(cmd)
            })
            this.Steps[this.Steps.length-1].SetTarget(target)
        }
    }

    Path.prototype.Current=function(){
        if (this.Steps.length==0){
            return null
        }
        return this.Steps[0]
    }
    Path.prototype.Move=function(){
        let step=this.Steps.shift()
        if (step){
            this.Moving.push(step)
        }
        return this.Current()
    }
    Path.prototype.Arrive=function(){
        return this.Moving.shift()
    }
    return Path
})