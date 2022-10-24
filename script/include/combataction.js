(function(){
    let Condition = Include("include/combatcondition.js")

    let CombatAction=function(line){
        this.Strategy=""
        this.Conditions=[]
        this.Command=""
        this.Data=""

        let data=SplitN(line,":",2)
        let param
        if (data.length==1){
            param=line
        }else{
            this.Strategy=data[0]
            param=data[1]
        }
        data=SplitN(param,">",2)
        let cmd=""
        if (data.length==1){
            cmd=param
        }else{
            let conditions=data[0].trim().split(",")
            for(var i=0;i<conditions.length;i++){
                let c=conditions[i].trim()
                if (c){
                    this.Conditions.push(new Condition(c))
                }
            }
            cmd=data[1]
        }
        if (cmd){
            if (cmd[0]=="#"){
                data=SplitN(cmd," ",2)
                this.Command=data[0]
                if (data.length>1){
                    this.Data=data[1]
                }
            }else{
                this.Data=cmd
            }
        }
    }
    return CombatAction
})()