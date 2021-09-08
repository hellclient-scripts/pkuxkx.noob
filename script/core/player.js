(function(app){

    app.Data.Score={}
    app.Core.OnPlayerScore=function(name, output, wildcards){
        app.Data.Score={
        }
        world.EnableTriggerGroup("playerscore",true)
    }
    app.Core.OnPlayerScore1=function(name, output, wildcards){
        app.Data.Score["rank"]=wildcards[0]
        app.Data.Score["name"]=wildcards[1]
        app.Data.Score["id"]=wildcards[2]
    }
    app.Core.OnPlayerScore2=function(name, output, wildcards){
        app.Data.Score["bl"]=wildcards[0]-0
        app.Data.Score["wx"]=wildcards[1]-0
        app.Data.Score["gg"]=wildcards[2]-0
        app.Data.Score["sf"]=wildcards[3]-0
    }
    app.Core.OnPlayerScore3=function(name, output, wildcards){
        app.Data.Score["fy"]=wildcards[0]-0
        app.Data.Score["rm"]=wildcards[1]-0
        app.Data.Score["lx"]=wildcards[2]-0
        app.Data.Score["ds"]=wildcards[3]
    }
    app.Core.OnPlayerScore4=function(name, output, wildcards){
        app.Data.Score["country"]=wildcards[0]
        app.Data.Score["family"]=wildcards[1]
    }
    app.Core.OnPlayerScore5=function(name, output, wildcards){
        app.Data.Score["age"]=CNumber.Split(wildcards[0]).Count
        app.Data.Score["teacher"]=wildcards[1]
    }
    app.Core.OnPlayerScore6=function(name, output, wildcards){
        app.Data.Score["gender"]=wildcards[0]
        app.Data.Score["loyalty"]=CNumber.Convert(wildcards[1])
    }
    app.Core.OnPlayerScore7=function(name, output, wildcards){
        app.Data.Score["birthday"]=wildcards[0]
        app.Data.Score["chushi"]=wildcards[1]
    }
    app.Core.OnPlayerScore8=function(name, output, wildcards){
        app.Data.Score["marry"]=wildcards[0]
        app.Data.Score["panshi"]=wildcards[1]
    }
    app.Core.OnPlayerScore9=function(name, output, wildcards){
        app.Data.Score["kill"]=wildcards[0]-0
        app.Data.Score["job"]=wildcards[1]
        app.Data.Score["saving"]=wildcards[3]?(wildcards[3]-0):0
    }
    app.Core.OnPlayerScore10=function(name, output, wildcards){
        app.Data.Score["killed"]=wildcards[0]-0
        app.Data.Score["morality"]=wildcards[1]-0
        app.Data.Score["wuxuepoint"]=wildcards[2]-0
    }
    app.Core.OnPlayerScore11=function(name, output, wildcards){
        app.Data.Score["deaths"]=wildcards[0]-0
        app.Data.Score["reputation"]=wildcards[1]-0
        app.Data.Score["guojiapoint"]=wildcards[2]-0
    }
    app.Core.OnPlayerScore12=function(name, output, wildcards){
        app.Data.Score["shaqi"]=wildcards[0]
        app.Data.Score["wish"]=wildcards[1]-0
        app.Data.Score["shizhan"]=CNumber.Split(wildcards[2]).Count
    }
    app.Core.OnPlayerScoreEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("playerscore",false)
    }
    app.Data.Skills={
        All:[],
    }
    app.Core.OnPlayerSkills=function(name, output, wildcards){
        world.EnableTriggerGroup("playerskills",true)
        app.Data.Skills={
            Max:CNumber.Convert(wildcards[1]),
            _currentType:"",
            All:[],
        }
    }
    App.Core.OnPlayerNoSkills=function(name, output, wildcards){
        app.Data.Skills={
            All:[],
        }
    }
    app.Core.OnPlayerSkillsType=function(name, output, wildcards){
        app.Data.Skills._currentType=wildcards[0]
    }
    app.Core.OnPlayerSkillsObj=function(name, output, wildcards){
        app.Data.Skills.All.push({
            ID:wildcards[2],
            Name:wildcards[1],
            Used:wildcards[0]!="  ",
            Comment:wildcards[3],
            Level:wildcards[4],
            Max:wildcards[5],
            Type:app.Data.Skills._currentType,
        })
    }
    app.Core.OnPlayerSkillsEnd=function(name, output, wildcards){
        delete(app.Data.Skills["_currentType"],playerskills)
    }
    app.Data.Jifa=[]
    app.Core.OnPlayerJifa=function(name, output, wildcards){
        world.EnableTriggerGroup("playerjifa",true)
        app.Data.Jifa=[]
    }
    App.Core.OnPlayerNoJifa=function(name, output, wildcards){
        app.Data.Jifa=[]
    }
    app.Core.OnPlayerJifaObj=function(name, output, wildcards){
        app.Data.Jifa.push({
            ID:wildcards[1],
            Name:wildcards[0],
            Skill:wildcards[2],
            Tags:wildcards[3],
            Level:wildcards[5],
        })
    }
    app.Core.OnPlayerJifaEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("playerjifa",false)
    }
    app.Data.HP={
    }
    app.Core.OnPlayerHpbrief=function(name, output, wildcards){
        app.Data.HP={}
        app.Data.HP["exp"]=world.GetTriggerWildcard(name,"exp")-0
        app.Data.HP["pot"]=world.GetTriggerWildcard(name,"pot")-0
        app.Data.HP["neili"]=world.GetTriggerWildcard(name,"neili")-0
        app.Data.HP["eff_neili"]=world.GetTriggerWildcard(name,"effneili")-0
        app.Data.HP["jingli"]=world.GetTriggerWildcard(name,"jingli")-0
        app.Data.HP["eff_jingli"]=world.GetTriggerWildcard(name,"eff_jingli")-0
        app.Data.HP["qixue_cap"]=world.GetTriggerWildcard(name,"qixue_cap")-0
        app.Data.HP["qixue"]=world.GetTriggerWildcard(name,"qixue")-0
        app.Data.HP["eff_qixue"]=world.GetTriggerWildcard(name,"eff_qixue")-0
        app.Data.HP["jing_cap"]=world.GetTriggerWildcard(name,"jing_cap")-0
        app.Data.HP["jing"]=world.GetTriggerWildcard(name,"jing")-0
        app.Data.HP["eff_jing"]=world.GetTriggerWildcard(name,"eff_jing")-0
        app.Data.HP["zhenqi"]=world.GetTriggerWildcard(name,"zhenqi")-0
        app.Data.HP["zhanyi"]=world.GetTriggerWildcard(name,"zhanyi")-0
        app.Data.HP["food"]=world.GetTriggerWildcard(name,"food")-0
        app.Data.HP["drink"]=world.GetTriggerWildcard(name,"drink")-0
        app.Data.HP["fighting"]=(world.GetTriggerWildcard(name,"fighting")=="1")
        app.Data.HP["busy"]=(world.GetTriggerWildcard(name,"busy")=="1")


    }
    
})(App)