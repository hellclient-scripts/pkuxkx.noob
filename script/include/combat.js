(function(){
    let Combat=function(){
        this.PerformCmd=""
        this.Targets={}
        this.Disarmed=false
        this.Recovery=-1
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
        let recovery=this.Recovery
        if (recovery<0){
            recovery=world.GetVariable("combat_yun_recover")-0
        }
        if (recovery>0&&(App.Data.HP["qixue"]-App.Data.HP["eff_qixue"]>=recovery)){
            App.Send("yun recover")
        }
        if (this.Disarmed){
            App.Core.Weapon.Wield()
        }
        App.Send(this.PerformCmd)
    }
    return Combat
})()