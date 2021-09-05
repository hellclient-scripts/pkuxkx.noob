(function(app){
    app.Data.HP={
    }
    app.Core.OnPlayerHP=function(name, output, wildcards){
        app.Data.HP={
        }
        world.EnableTriggerGroup("playerhp",true)
    }
    app.Core.OnPlayerHP1=function(name, output, wildcards){
        app.Data.HP["eff_jing"]=wildcards[0]-0
        app.Data.HP["jing"]=wildcards[1]-0
        app.Data.HP["per_jing"]=wildcards[2]-0
        app.Data.HP["eff_jingli"]=wildcards[3]-0
        app.Data.HP["jingli"]=wildcards[4]-0
        app.Data.HP["jiajing"]=wildcards[5]-0
    }
    app.Core.OnPlayerHP2=function(name, output, wildcards){
        app.Data.HP["eff_qixue"]=wildcards[0]-0
        app.Data.HP["qixue"]=wildcards[1]-0
        app.Data.HP["per_qixue"]=wildcards[2]-0
        app.Data.HP["eff_neili"]=wildcards[3]-0
        app.Data.HP["neili"]=wildcards[4]-0
        app.Data.HP["jiali"]=wildcards[5]-0
    }
    app.Core.OnPlayerHP3=function(name, output, wildcards){
        app.Data.HP["eff_zhenqi"]=wildcards[0]-0
        app.Data.HP["zhengqi"]=wildcards[1]-0
        app.Data.HP["eff_jingqi"]=wildcards[2]-0
        app.Data.HP["jingqi"]=wildcards[3]-0
        app.Data.HP["jingqi_status"]=wildcards[4]
    }
    app.Core.OnPlayerHP4=function(name, output, wildcards){
        app.Data.HP["eff_zhenqi"]=wildcards[0]-0
        app.Data.HP["zhengqi"]=wildcards[1]-0
        app.Data.HP["eff_jingqi"]=wildcards[2]-0
        app.Data.HP["jingqi"]=wildcards[3]-0
        app.Data.HP["jingqi_status"]=wildcards[4]
    }
    app.Core.OnPlayerHP5=function(name, output, wildcards){
        app.Data.HP["eff_drink"]=wildcards[0]-0
        app.Data.HP["drink"]=wildcards[1]-0
        app.Data.HP["drink_status"]=wildcards[2]
        app.Data.HP["exp"]=wildcards[3]-0
    }
    app.Core.OnPlayerHP6=function(name, output, wildcards){
        app.Data.HP["status"]=wildcards[0]
    }
    
    app.Core.OnPlayerHPEnd=function(name, output, wildcards){
        world.EnableTriggerGroup("playerhp",false)
    }
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
        app.Data.Score["saving"]=CNumber.Convert(wildcards[2])
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
})(App)