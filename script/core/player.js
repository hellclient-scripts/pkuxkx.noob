(function(App){
    let check=Include("core/check/check.js")
    App.Data.Score={}
    App.Data.LastScore=0
    App.Bind("Check","core.player.score")
    let checkScore=(new check("score")).WithLevel(App.CheckLevelBrief).WithCommand("score").WithIntervalParam("checkscoreinterval").WithLastID("LastScore")
    App.RegisterCallback("core.player.score",checkScore.Callback())
    App.Core.OnPlayerScore=function(name, output, wildcards){
        App.Data.Score={
        }
        App.Data.LastScore=Now()
        world.EnableTriggerGroup("playerscore",true)
    }
    App.Core.OnPlayerScore1=function(name, output, wildcards){
        App.Data.Score["rank"]=wildcards[0]
        App.Data.Score["name"]=wildcards[1]
        App.Data.Score["id"]=wildcards[2]
    }
    App.Core.OnPlayerScore2=function(name, output, wildcards){
        App.Data.Score["bl"]=wildcards[0]-0
        App.Data.Score["wx"]=wildcards[1]-0
        App.Data.Score["gg"]=wildcards[2]-0
        App.Data.Score["sf"]=wildcards[3]-0
    }
    App.Core.OnPlayerScore3=function(name, output, wildcards){
        App.Data.Score["fy"]=wildcards[0]-0
        App.Data.Score["rm"]=wildcards[1]-0
        App.Data.Score["lx"]=wildcards[2]-0
        App.Data.Score["ds"]=wildcards[3]
    }
    App.Core.OnPlayerScore4=function(name, output, wildcards){
        App.Data.Score["country"]=wildcards[0]
        App.Data.Score["family"]=wildcards[1]
    }
    App.Core.OnPlayerScore5=function(name, output, wildcards){
        App.Data.Score["age"]=CNumber.Split(wildcards[0]).Count
        App.Data.Score["teacher"]=wildcards[1]
    }
    App.Core.OnPlayerScore6=function(name, output, wildcards){
        App.Data.Score["gender"]=wildcards[0]
        App.Data.Score["loyalty"]=CNumber.Convert(wildcards[1])
    }
    App.Core.OnPlayerScore7=function(name, output, wildcards){
        App.Data.Score["birthday"]=wildcards[0]
        App.Data.Score["chushi"]=wildcards[1]
    }
    App.Core.OnPlayerScore8=function(name, output, wildcards){
        App.Data.Score["marry"]=wildcards[0]
        App.Data.Score["panshi"]=wildcards[1]
    }
    App.Core.OnPlayerScore9=function(name, output, wildcards){
        App.Data.Score["kill"]=wildcards[0]-0
        App.Data.Score["job"]=wildcards[1]
        App.Data.Score["saving"]=wildcards[3]?(wildcards[3]-0):0
    }
    App.Core.OnPlayerScore10=function(name, output, wildcards){
        App.Data.Score["killed"]=wildcards[0]-0
        App.Data.Score["morality"]=wildcards[1]-0
        App.Data.Score["wuxuepoint"]=wildcards[2]-0
    }
    App.Core.OnPlayerScore11=function(name, output, wildcards){
        App.Data.Score["deaths"]=wildcards[0]-0
        App.Data.Score["reputation"]=wildcards[1]-0
        App.Data.Score["guojiapoint"]=wildcards[2]-0
    }
    App.Core.OnPlayerScore12=function(name, output, wildcards){
        App.Data.Score["shaqi"]=wildcards[0]
        App.Data.Score["wish"]=wildcards[1]-0
        App.Data.Score["shizhan"]=CNumber.Split(wildcards[2]).Count
    }
    App.Core.OnPlayerScoreEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("playerscore",false)
    }
    App.Data.Skills={
        All:[],
    }
    App.Data.LastSkills=0
    App.Bind("Check","core.player.skills")
    let checkSkills=(new check("skills")).WithLevel(App.CheckLevelFull).WithCommand("skills").WithIntervalParam("checkskillsinterval").WithLastID("LastSkills")
    App.RegisterCallback("core.player.skills",checkSkills.Callback())

    App.Core.OnPlayerSkills=function(name, output, wildcards){
        world.EnableTriggerGroup("playerskills",true)
        App.Data.Skills={
            Max:CNumber.Convert(wildcards[1]),
            _currentType:"",
            All:[],
        }
    }
    App.Core.OnPlayerNoSkills=function(name, output, wildcards){
        App.Data.Skills={
            All:[],
        }
        App.Data.LastSkills=Now()
    }
    App.Core.OnPlayerSkillsType=function(name, output, wildcards){
        App.Data.Skills._currentType=wildcards[0]
    }
    App.Core.OnPlayerSkillsObj=function(name, output, wildcards){
        App.Data.Skills.All.push({
            ID:wildcards[2],
            Name:wildcards[1],
            Used:wildcards[0]!="  ",
            Comment:wildcards[3],
            Level:wildcards[4],
            Max:wildcards[5],
            Type:App.Data.Skills._currentType,
        })
    }
    App.Core.OnPlayerSkillsEnd=function(name, output, wildcards){
        delete(App.Data.Skills["_currentType"],playerskills)
        App.Data.LastSkills=Now()
    }
    App.Data.Jifa=[]
    App.Data.LastJifa=0
    App.Bind("Check","core.player.jifa")
    let checkJifa=(new check("jifa")).WithLevel(App.CheckLevelFull).WithCommand("jifa").WithIntervalParam("checkjifainterval").WithLastID("LastJifa")
    App.RegisterCallback("core.player.jifa",checkJifa.Callback())
    App.Core.OnPlayerJifa=function(name, output, wildcards){
        world.EnableTriggerGroup("playerjifa",true)
        App.Data.Jifa=[]
    }
    App.Core.OnPlayerNoJifa=function(name, output, wildcards){
        App.Data.Jifa=[]
        App.Data.LastJifa=Now()
    }
    App.Core.OnPlayerJifaObj=function(name, output, wildcards){
        App.Data.Jifa.push({
            ID:wildcards[1],
            Name:wildcards[0],
            Skill:wildcards[2],
            Tags:wildcards[3],
            Level:wildcards[5],
        })
    }
    App.Core.OnPlayerJifaEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("playerjifa",false)
        App.Data.LastJifa=Now()
    }
    App.Data.HP={
    }
    App.Data.LastHP=0
    App.Bind("Check","core.player.hp")
    let checkHP=(new check("hp")).WithLevel(App.CheckLevelFull).WithCommand("hpbrief").WithIntervalParam("checkhpinterval").WithLastID("LastHP")
    App.RegisterCallback("core.player.hp",checkHP.Callback())
    App.Core.OnPlayerHpbrief=function(name, output, wildcards){
        App.Data.HP={}
        App.Data.HP["exp"]=world.GetTriggerWildcard(name,"exp")-0
        App.Data.HP["pot"]=world.GetTriggerWildcard(name,"pot")-0
        App.Data.HP["neili"]=world.GetTriggerWildcard(name,"neili")-0
        App.Data.HP["eff_neili"]=world.GetTriggerWildcard(name,"effneili")-0
        App.Data.HP["jingli"]=world.GetTriggerWildcard(name,"jingli")-0
        App.Data.HP["eff_jingli"]=world.GetTriggerWildcard(name,"eff_jingli")-0
        App.Data.HP["qixue_cap"]=world.GetTriggerWildcard(name,"qixue_cap")-0
        App.Data.HP["qixue"]=world.GetTriggerWildcard(name,"qixue")-0
        App.Data.HP["eff_qixue"]=world.GetTriggerWildcard(name,"eff_qixue")-0
        App.Data.HP["jing_cap"]=world.GetTriggerWildcard(name,"jing_cap")-0
        App.Data.HP["jing"]=world.GetTriggerWildcard(name,"jing")-0
        App.Data.HP["eff_jing"]=world.GetTriggerWildcard(name,"eff_jing")-0
        App.Data.HP["zhenqi"]=world.GetTriggerWildcard(name,"zhenqi")-0
        App.Data.HP["zhanyi"]=world.GetTriggerWildcard(name,"zhanyi")-0
        App.Data.HP["food"]=world.GetTriggerWildcard(name,"food")-0
        App.Data.HP["drink"]=world.GetTriggerWildcard(name,"drink")-0
        App.Data.HP["fighting"]=(world.GetTriggerWildcard(name,"fighting")=="1")
        App.Data.HP["busy"]=(world.GetTriggerWildcard(name,"busy")=="1")
        App.Data.LastHP=Now()
    }
    
})(App)