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
        this.HaltWound=0
        this.HaltCurrent=0
    }
    Combat.prototype.SetHaltCurrent=function(data){
        this.HaltCurrent=data
    }
    Combat.prototype.SetHaltWound=function(data){
        this.HaltWound=data
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
        let effqixue=App.Data.HP["eff_qixue"]
        let qixue=App.Data.HP["qixue"]
        let qixuecap=App.Data.HP["qixue_cap"]
        let currentqixue=effqixue/qixuecap
        let perqixue=qixue/qixuecap
        let effjing=App.Data.HP["eff_jing"]
        let jing=App.Data.HP["jing"]
        let jingcap=App.Data.HP["jing_cap"]
        let currentjing=effjing/jingcap
        let perjing=jing/jingcap
        if(
            currentqixue<this.HaltCurrent||
            perqixue<this.HaltCurrent||
            perqixue<this.HaltWound||
            currentjing<this.HaltCurrent||
            perjing<this.HaltCurrent||
            perjing<this.HaltWound
            ){
                App.Send("halt")
        }
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