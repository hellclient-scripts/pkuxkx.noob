(function(){
    let Study=function(cmd){
        let data=cmd.split("::")
        if (data.length<3){
            throw "学习指令["+cmd+"]格式错误，应该为 技能名::学习类型::位置::目标(师傅名，书名等)::最大等级, 位置，目标和最大等级可以省略"
        }
        this.Skill=data[0]
        this.Type=data[1]
        this.Location=data.length>2?data[2]:""
        this.Target=data.length>3?data[3]:""
        this.Max=0
        if (data.length>4){
            this.Max=(data[4]-0)
        }        
    }
    return Study
})()