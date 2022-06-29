(function(){
    let Combat=function(){
        this.PerformCmd=""
        this.Targets={}
        this.Disarmed=false
    }
    Combat.prototype.SetCommands=function(cmds){
        let data=cmds.split("\n")
        let self=this
        data.forEach(function(cmd){
            if (cmd==""){
                return
            }
            if (cmd[0]!="#"){
                cmd="#perform "+cmd
            }
            let cmddata=new Directive(cmd)
            switch (cmddata.Command){
                case "#perform":
                    self.PerformCmd=cmddata.Data
                break
            }
        })
    }
    Combat.prototype.Perform=function(){
        App.Send(this.PerformCmd)
    }
    return Combat
})()