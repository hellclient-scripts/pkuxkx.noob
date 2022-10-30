(function(){
    let Action = Include("include/action.js")
    let Combat=function(strategylist){
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
        this.StrategyList=strategylist || []
        this.Strategy=""
        this.Actions=[]
    }
    Combat.prototype.LoadActions=function(data){
        let lines=data.split("\n")
        let defaultresult=[]
        let result=[]
        result[this.Strategy]=[]
        for(var i=0;i<lines.length;i++){
            let line=lines[i].trim()
            if (line){
                let action=new Action(line)
                if (this.Strategy==action.Strategy){
                    result.push(action)
                }
                if (this.Strategy==""){
                    defaultresult.push(action)
                }
            }
        }
        this.Actions=result.length>0?result:defaultresult
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
    return Combat
})()