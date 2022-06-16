(function(App){
    let study=Include("include/study.js")
    App.Quest.Study={}
    App.Quest.Study.Plan=[]
    App.Quest.Study.Current=null
    App.Quest.Study.PickPlan=function(){
        let available=[]
        App.Quest.Study.Plan.forEach(p=>{
            skill=App.Core.PlayerGetSkillByID(p.Skill)
            if (skill!=null){
                let max=p.Max
                if (max<=0){
                    max=skill.Max
                }
                if (skill>=max){
                    return
                }
                if (App.Data.HP["pot"]==0 && skills.type=="xue"){
                    return
                }
            }
             available.push(p)
        })
        if (available.length==0){
            App.Fail()
            return
        }
        App.Quest.Study.Current=RandomList(App.Quest.Study.Plan)
        App.Next()
    }
    App.Quest.Study.Move=function(){
        let type=App.Quest.Study.Current.Type
        let location=App.Quest.Study.Current.Location
        if (!location){
            switch(type){
                case "lian":
                case "read":
                    location=App.GetSleepRooms()
                break
                case "lingwu":
                    location=App.GetSleepRooms()
                default:
                    throw "学习["+type+"]位置不可为空"
                break
            }
        }
        App.Commands([
            App.NewCommand('to',App.Options.NewWalk(location)),
            App.NewCommand('nobusy'),
            App.NewCommand('function',App.Quest.Study.Execute),
            App.NewCommand('rest'),
        ]).Push()
        App.Next()
    }
    App.Quest.Study.Execute=function(){
        let study=App.Quest.Study.Current
        let cmd=""
        switch(study.Type){
            case 'xue':
                cmd=App.Quest.Study.Xue()
            break
            case "lian":
                cmd="lian "+ study.Skill+" 50"
            break
            case "lingwu":
                cmd="lingwu "+ study.Skill+" 50"
            break
            case "read":
                cmd="read "+ study.Target+" 50"
            break
            default:
                throw "学习方式["+study.Type+"]未知"
        }
        App.Commands([
            App.NewCommand("do",cmd),
            App.NewCommand("rest"),
        ]).Push()
        App.Next()
    }
    App.Quest.Study.Xue=function(){
        let pot=50
        if (pot>App.Data.HP["pot"]){pot = App.Data.HP["pot"]}
        return 'xue '+App.Quest.Study.Current.Target+" for " +App.Quest.Study.Current.Skill+ " "+pot
    }
    let re=/\n/g
    App.Quest.Study.Start=function(cmd){
        if (cmd==""){
            cmd=world.GetVariable("study").replace(re, ",")

        }
        let data=cmd.split(",")
        data.forEach(value => {
            if (value){
              App.Quest.Study.Plan.push(new study(value))
            }
        });
        App.Commands([
            App.NewCommand('prepare',App.PrapareFull),
            App.NewCommand('function',App.Quest.Study.PickPlan),
            App.NewCommand('function',App.Quest.Study.Move),            
        ]).Push()
        App.Next()
    }
})(App)