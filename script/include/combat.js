(function(){
    let Combat=function(){
        this.PerformCmd=""
    }
    Combat.prototype.SetCommands=function(cmds){
        let data=cmds.split("\n")
        data.forEach(function(cmd){
            if (cmd==""){
                return
            }
            if (cmd[0]!="#"){
                cmd="#perform "+cmd[0]
            }
            let cmddata=new Directive(cmd)
            switch (cmddata.Command){
                case "#perform":
                    this.PerformCmd=cmddata.Data
                break
            }
        })
    }
    return Combat
})()