(function(){
    let CombatCondition=function(line){
        this.Type=""
        this.Data=""
        this.Exclude=false
        if (line[0]=="!"){
            this.Exclude=true
        }
        let data=SplitN(line," ",2)
        this.Type=data[0]
        this.Data=data.length>1?data[1]:""
    }
    return CombatCondition
})()