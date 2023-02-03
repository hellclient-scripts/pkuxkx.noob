(function(){
    let Perform=function(id,tri){
        this.ID=id
        this.Commands=[]
        this.Group=""
        this.Cooldown=5
        this.Before=""
        this.After=""
        this.Triggers=[]
        this.AddTrigger(tri,0)
    }
    Perform.prototype.AddTrigger=function(tri,cooldown){
        this.Triggers.push({
            Trigger:tri,
            Cooldown:cooldown?cooldown:0
        })
    }
    Perform.prototype.AddCommand=function(cmd,ontarget){
        this.Commands.push({
            Command:cmd,
            OnTarget:ontarget,
        })
    }
    Perform.prototype.CaclCooldown=function(line){
        for (var i=0;i<this.Triggers.length;i++){
            if (line.match(this.Triggers[i].Trigger)){
                return this.Triggers[i].Cooldown
            }
        }
        return  -1
    }
    Perform.prototype.Execute=function(target){
        for (var i=0;i<this.Commands.length;i++){
            let command=this.Commands[i]
            if (target){
                if (command.OnTarget){
                    App.Send(command.Command.replace("$1", target))
                }
            }else{
                if (!command.OnTarget){
                    App.Send(command.Command)
                }
            }
        }
    }
    return Perform
})()