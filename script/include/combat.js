(function(){
    let Combat=function(){
        this.PerformCmd=""
        this.Targets={}
        this.Disarmed=false
        this.Recovery=-1
        this.After=null
        this.Yield=false
        this.Online=null
        this.OnNpcFlee=null
        this.StartAt=Now()
    }
    Combat.prototype.SetOnline=function(Online){
        this.Online=Online
    }
    Combat.prototype.SetOnNpcFlee=function(OnNpcFlee){
        this.OnNpcFlee=OnNpcFlee
    }
    
    Combat.prototype.SetYield=function(y){
        this.Yield=y
    }
    Combat.prototype.SetAfter=function(cmd){
        this.After=cmd
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
        if (this.Yield){
            return
        }
        App.Send(this.PerformCmd)
    }
    return Combat
})()