(function (App) {
    let check = Include("core/check/check.js")
    App.Data.NoForce=false
    App.Data.Score = {}
    App.Data.LastScore = 0
    App.Data.Exp = 0
    App.Data.Exp.Qishi=0
    App.Data.Special = {}
    App.Data.SpecialInUse = {}
    App.Core.SpecialStart = function (name, output, wildcards) {
        App.Data.Special = {}
        world.EnableTriggerGroup("playerspecial", true)
    }
    App.Core.HasSpecial = function (id, level) {
        let special = App.Data.SpecialInUse[id]
        if (!special) {
            return false
        }
        return special.Level >= level
    }
    App.Core.OnSpecial = function (name, output, wildcards) {
        let special = {
            Enabled: wildcards[0] == "*",
            Label: wildcards[1],
            ID: wildcards[2],
            Level: wildcards[3] - 0,

        }
        App.Data.Special[special.ID] = special
        if (special.Enabled) {
            App.Data.SpecialInUse[special.ID] = special
        }
    }
    App.Core.SpecialEnd = function (name, output, wildcards) {
        world.EnableTriggerGroup("playerspecial", false)
    }
    world.EnableTriggerGroup("playerspecial", false)
    App.Bind("Check", "core.player.score")
    let checkScore = (new check("score")).WithLevel(App.CheckLevelBrief).WithCommand("score").WithIntervalParam("checkscoreinterval").WithLastID("LastScore")
    App.RegisterCallback("core.player.score", checkScore.Callback())
    App.Core.OnPlayerScore = function (name, output, wildcards) {
        App.Data.Score = {
        }
        App.Data.LastScore = Now()
        world.EnableTriggerGroup("playerscore", true)
    }
    App.Core.OnPlayerScore1 = function (name, output, wildcards) {
        App.Data.Score["rank"] = wildcards[0]
        App.Data.Score["name"] = wildcards[1]
        App.Data.Score["id"] = wildcards[2]
    }
    App.Core.OnPlayerScore2 = function (name, output, wildcards) {
        App.Data.Score["bl"] = wildcards[0] - 0
        App.Data.Score["wx"] = wildcards[1] - 0
        App.Data.Score["gg"] = wildcards[2] - 0
        App.Data.Score["sf"] = wildcards[3] - 0
    }
    App.Core.OnPlayerScore3 = function (name, output, wildcards) {
        App.Data.Score["fy"] = wildcards[0] - 0
        App.Data.Score["rm"] = wildcards[1] - 0
        App.Data.Score["lx"] = wildcards[2] - 0
        App.Data.Score["ds"] = wildcards[3]
    }
    App.Core.OnPlayerScore4 = function (name, output, wildcards) {
        App.Data.Score["country"] = wildcards[0]
        App.Data.Score["gender"] = wildcards[1]
        App.Data.Score["family"] = wildcards[2]
    }
    App.Core.OnPlayerScore5 = function (name, output, wildcards) {
        // App.Data.Score["age"]=CNumber.Split(wildcards[0]).Count
        // App.Data.Score["teacher"]=wildcards[1]
    }
    App.Core.OnPlayerScore6 = function (name, output, wildcards) {
        // App.Data.Score["gender"]=wildcards[0]
        // App.Data.Score["loyalty"]=CNumber.Convert(wildcards[1])
    }
    App.Core.OnPlayerScore7 = function (name, output, wildcards) {
        // App.Data.Score["birthday"]=wildcards[0]
        // App.Data.Score["chushi"]=wildcards[1]
    }
    App.Core.OnPlayerScore8 = function (name, output, wildcards) {
        // App.Data.Score["marry"]=wildcards[0]
        // App.Data.Score["panshi"]=wildcards[1]
    }
    App.Core.OnPlayerScore9 = function (name, output, wildcards) {
        App.Data.Score["kill"] = wildcards[0] - 0
        App.Data.Score["job"] = wildcards[1]
        App.Data.Score["saving"] = wildcards[3] ? (wildcards[3] - 0) : 0
    }
    App.Core.OnPlayerScore10 = function (name, output, wildcards) {
        App.Data.Score["killed"] = wildcards[0] - 0
        App.Data.Score["morality"] = wildcards[1] - 0
        App.Data.Score["silver"] = wildcards[2]
    }
    App.Core.OnPlayerScore11 = function (name, output, wildcards) {
        App.Data.Score["deaths"] = wildcards[0] - 0
        App.Data.Score["reputation"] = wildcards[1] - 0
        App.Data.Score["wuxuepoint"] = wildcards[2] - 0
    }
    App.Core.OnPlayerScore12 = function (name, output, wildcards) {
        App.Data.Score["shaqi"] = wildcards[0]
        App.Data.Score["wish"] = wildcards[1] - 0
        App.Data.Score["guojiapoint"] = wildcards[2] - 0
    }
    App.Core.OnPlayerScoreEnd = function (name, output, wildcards) {
        world.EnableTriggerGroup("playerscore", false)
    }
    App.RegisterCallback("core.player.inittags", function () {
        Mapper.settag(App.Data.Score["family"], true)
        Mapper.settag(App.Data.Score["gender"], true)
        if (App.Data.Score["morality"]>0){
            Mapper.settag("正神", true)
        }else if(App.Data.Score["morality"]<0){
            Mapper.settag("负神", true)
        }
        let dodge = App.Core.PlayerGetSkillByID("dodge")
        if (dodge) {
            for (var i = 100; i <= 2000; i += 50) {
                if (dodge.Level >= i) {
                    Mapper.settag("dodge" + i, true)
                }
            }
        }
        let force = App.Core.PlayerGetSkillByID("force")
        if (force) {
            for (var i = 100; i <= 2000; i += 100) {
                if (force.Level >= i) {
                    Mapper.settag("force" + i, true)
                }
            }
        }
        let sorcery=App.Core.PlayerGetSkillByID("sorcery")
        if (sorcery) {
            if (sorcery.Level>49){
                Mapper.settag("sorcery50",true)
            }
            if (sorcery.Level>149){
                Mapper.settag("sorcery150",true)
            }
            if (sorcery.Level>200){
                Mapper.settag("sorcery201",true)
            }
        }
        let neili=App.Data.HP["neili"]
        for (var i = 500; i <= 10000; i += 500) {
            if (neili >= i) {
                Mapper.settag("neili" + i, true)
            }
        }
        
        let exp=App.Data.Exp
        for (var i = 100000; i <= 1000000; i += 100000) {
            if (exp >= i) {
                Mapper.settag("exp" + i, true)
            }
        }

        for (var i = 1000000; i <= 100000000; i += 1000000) {
            if (exp >= i) {
                Mapper.settag("exp" + i, true)
            }
        }
        for (var key in App.Data.SpecialInUse) {
            Mapper.settag(key, true)
            Mapper.settag(key + (App.Data.SpecialInUse[key].Level), true)
        }
    })
    App.Bind("PathInit", "core.player.inittags")

    App.Data.Skills = {
        All: [],
    }
    App.Data.LastSkills = 0
    App.Bind("Check", "core.player.skills")
    let checkSkills = (new check("skills")).WithLevel(App.CheckLevelFull).WithCommand("skills").WithIntervalParam("checkskillsinterval").WithLastID("LastSkills")
    App.RegisterCallback("core.player.skills", checkSkills.Callback())

    App.Core.OnPlayerSkills = function (name, output, wildcards) {
        world.EnableTriggerGroup("playerskills", true)
        App.Data.Skills = {
            Max: CNumber.Convert(wildcards[0]),
            _currentType: "",
            All: [],
        }
    }
    App.Core.OnPlayerNoSkills = function (name, output, wildcards) {
        App.Data.Skills = {
            All: [],
        }
        App.Data.LastSkills = Now()
    }
    App.Core.OnPlayerSkillsType = function (name, output, wildcards) {
        App.Data.Skills._currentType = wildcards[0]
    }
    App.Core.OnPlayerSkillsObj = function (name, output, wildcards) {
        App.Data.Skills.All.push({
            ID: wildcards[2],
            Name: wildcards[1],
            Used: wildcards[0] != "  ",
            Comment: wildcards[3],
            Level: wildcards[4] - 0,
            Max: wildcards[5],
            Type: App.Data.Skills._currentType,
        })
    }
    App.Core.PlayerGetSkillByID = function (id) {
        for (var i = 0; i < App.Data.Skills.All.length; i++) {
            let skill = App.Data.Skills.All[i]
            if (skill.ID.toLowerCase() == id.toLowerCase()) {
                return skill
            }
        }
        return null
    }
    App.Core.OnPlayerSkillsEnd = function (name, output, wildcards) {
        delete (App.Data.Skills["_currentType"], playerskills)
        App.Data.LastSkills = Now()
    }
    App.Data.Jifa = []
    App.Data.LastJifa = 0
    App.Bind("Check", "core.player.jifa")
    let checkJifa = (new check("jifa")).WithLevel(App.CheckLevelFull).WithCommand("jifa").WithIntervalParam("checkjifainterval").WithLastID("LastJifa")
    App.RegisterCallback("core.player.jifa", checkJifa.Callback())
    App.Core.OnPlayerJifa = function (name, output, wildcards) {
        world.EnableTriggerGroup("playerjifa", true)
        App.Data.Jifa = []
    }
    App.Core.OnPlayerNoJifa = function (name, output, wildcards) {
        App.Data.Jifa = []
        App.Data.LastJifa = Now()
    }
    App.Core.OnPlayerJifaObj = function (name, output, wildcards) {
        App.Data.Jifa.push({
            ID: wildcards[1],
            Name: wildcards[0],
            Skill: wildcards[2],
            Tags: wildcards[3],
            Level: wildcards[5],
        })
    }
    App.Core.OnPlayerJifaEnd = function (name, output, wildcards) {
        world.EnableTriggerGroup("playerjifa", false)
        App.Data.LastJifa = Now()
    }

    App.Bind("Check", "core.player.avatar")
    let checkAvatar = (new check("avatar")).WithLevel(App.CheckLevelBrief).WithCommand("i").WithIntervalParam("checkavatarinterval").WithLastID("LastAvatar")
    App.RegisterCallback("core.player.avatar", checkAvatar.Callback())

    App.Data.HP = {
        status: {},
    }
    App.Data.LastHP = 0
    App.Bind("Check", "core.player.hp")

    App.Core.OnPlayerHpbrief = function (name, output, wildcards) {
        // App.Data.HP={}
        App.Data.HP["pot"] = world.GetTriggerWildcard(name, "pot") - 0
        App.Data.HP["neili"] = world.GetTriggerWildcard(name, "neili") - 0
        App.Data.HP["eff_neili"] = world.GetTriggerWildcard(name, "eff_neili") - 0
        App.Data.HP["jingli"] = world.GetTriggerWildcard(name, "jingli") - 0
        App.Data.HP["eff_jingli"] = world.GetTriggerWildcard(name, "eff_jingli") - 0
        App.Data.HP["qixue_cap"] = world.GetTriggerWildcard(name, "qixue_cap") - 0
        App.Data.HP["qixue"] = world.GetTriggerWildcard(name, "qixue") - 0
        App.Data.HP["eff_qixue"] = world.GetTriggerWildcard(name, "eff_qixue") - 0
        App.Data.HP["jing_cap"] = world.GetTriggerWildcard(name, "jing_cap") - 0
        App.Data.HP["jing"] = world.GetTriggerWildcard(name, "jing") - 0
        App.Data.HP["eff_jing"] = world.GetTriggerWildcard(name, "eff_jing") - 0

        App.Data.HP["zhenqi"] = world.GetTriggerWildcard(name, "zhenqi") - 0
        App.Data.HP["zhanyi"] = world.GetTriggerWildcard(name, "zhanyi") - 0
        App.Data.HP["food"] = world.GetTriggerWildcard(name, "food") - 0
        App.Data.HP["drink"] = world.GetTriggerWildcard(name, "drink") - 0

        App.Data.HP["per_qixue"] = 100 * App.Data.HP["qixue"] / App.Data.HP["qixue_cap"]
        App.Data.HP["per_jing"] = 100 * App.Data.HP["jing"] / App.Data.HP["jing_cap"]
        App.Data.LastHP = Now()
    }

    let checkrecover=function(){
        App.Recover()
        App.Send("hp")
    }
    App.Recover=function(){
        let sorcery=App.Core.PlayerGetSkillByID("sorcery")
        if (sorcery&&sorcery.Level>60) {
            App.Send("so recover")
        }
        App.Send("yun recover;yun regenerate")
    }
    let checkHP = (new check("hp")).WithLevel(App.CheckLevelFull).WithCommand(checkrecover).WithIntervalParam("checkhpinterval").WithLastID("LastHP")
    App.RegisterCallback("core.player.hp", checkHP.Callback())
    App.Core.OnPlayerHP = function (name, output, wildcards) {
        // App.Data.HP={}
        world.EnableTriggerGroup("playerhp", true)
    }
    App.Core.OnPlayerHP1 = function (name, output, wildcards) {
        App.Data.HP["eff_jing"] = wildcards[0] - 0
        App.Data.HP["jing"] = wildcards[1] - 0
        App.Data.HP["per_jing"] = wildcards[2] - 0
        App.Data.HP["jing_cap"]=Math.floor(App.Data.HP["jing"]*100/App.Data.HP["per_jing"])
        App.Data.HP["eff_jingli"] = wildcards[3] - 0
        App.Data.HP["jingli"] = wildcards[4] - 0
        App.Data.HP["jiajing"] = wildcards[5] - 0
    }
    App.Core.OnPlayerHP2 = function (name, output, wildcards) {
        App.Data.HP["eff_qixue"] = wildcards[0] - 0
        App.Data.HP["qixue"] = wildcards[1] - 0
        App.Data.HP["per_qixue"] = wildcards[2] - 0
        App.Data.HP["qixue_cap"]=Math.floor(App.Data.HP["qixue"]*100/App.Data.HP["per_qixue"])
        App.Data.HP["eff_neili"] = wildcards[3] - 0
        App.Data.HP["neili"] = wildcards[4] - 0
        App.Data.HP["jiali"] = wildcards[5] - 0
    }
    App.Core.OnPlayerHP3 = function (name, output, wildcards) {
        App.Data.HP["eff_zhenqi"] = wildcards[0] - 0
        App.Data.HP["zhengqi"] = wildcards[1] - 0
        App.Data.HP["eff_jingqi"] = wildcards[2] - 0
        App.Data.HP["jingqi"] = wildcards[3] - 0
        App.Data.HP["jingqi_status"] = wildcards[4]
    }
    App.Core.OnPlayerHP4 = function (name, output, wildcards) {
        App.Data.HP["food"] = wildcards[0] - 0
        App.Data.HP["food_cap"] = wildcards[1] - 0
        App.Data.HP["pot"] = wildcards[3] - 0
    }
    App.Core.OnPlayerHP5 = function (name, output, wildcards) {
        App.Data.HP["drink"] = wildcards[0] - 0
        App.Data.HP["drink_cap"] = wildcards[1] - 0
        App.Data.Exp = wildcards[3] - 0
    }
    App.Core.OnPlayerHP6 = function (name, output, wildcards) {
        App.Data.HP["status"] = {}
        wildcards[0].split("、").forEach(function (data) {
            App.Data.HP["status"][data] = true
        })
    }
    App.Core.Dazuo=function(){
        let num=App.Data.HP["qixue"]?Math.floor((App.Data.HP["qixue"]/10)):10
        if (num>App.Data.HP["eff_qixue"]){
            num=App.Data.HP["eff_qixue"]
        }
        if (num<10){
            num=10
        }
        App.Send("dazuo "+num)
    }
    App.Core.OnPlayerHPEnd = function (name, output, wildcards) {
        world.EnableTriggerGroup("playerhp", false)
    }
    App.Core.OnHealed = function (name, output, wildcards) {
        App.Data.HP["eff_qixue"] = App.Data.HP["qixue"] - 0
        App.Data.HP["per_qixue"] = 100
    }
    App.Core.OnInspired = function (name, output, wildcards) {
        App.Data.HP["eff_jing"] = App.Data.HP["jing"] - 0
        App.Data.HP["per_jing"] = 100
    }
    App.Core.OnNoNeili = function (name, output, wildcards) {
        App.Data.HP["eff_neili"] = 0
    }
    App.Core.PerQixue = function () {
        return App.Data.HP["per_qixue"]
    }
    App.Core.PerJing = function () {
        return App.Data.HP["per_jing"]
    }
    App.Core.OnPoisonMjzq = function (name, output, wildcards) {
        App.Data.HP["status"]["苗疆"] = true
    }
    App.Core.OnPoisonXxdz = function (name, output, wildcards) {
        App.Data.HP["status"]["星宿毒掌毒"] = true
    }
    App.Core.OnPoisonXxxd = function (name, output, wildcards) {
        App.Data.HP["status"]["星宿火毒"] = true
    }
    App.Core.OnPoisonBphd = function (name, output, wildcards) {
        App.Data.HP["status"]["冰魄寒毒"] = true
    }
    App.Core.OnPoisonShedu = function (name, output, wildcards) {
        App.Data.HP["status"]["蛇毒"] = true
    }
    App.Core.OnPoisonSsf = function (name, output, wildcards) {
        App.Data.HP["status"]["生死符"] = true
    }
    App.Core.OnPoisonHyd = function (name, output, wildcards) {
        App.Data.HP["status"]["火焰刀"] = true
    }
    App.Core.OnPoisonNxsz = function (name, output, wildcards) {
        App.Data.HP["status"]["凝血神爪毒"] = true
    }
    App.Core.OnPoisonBtsd = function (name, output, wildcards) {
        App.Data.HP["status"]["白驼蛇毒"] = true
    }
    App.Core.OnPlayerOnHealFail = function (name, output, wildcards) {
        App.RaiseRoomEvent("core.healfail")
        App.RaiseStateEvent("core.healfail")
    }
    App.Core.OnPlayerNoForce=function(name, output, wildcards){
        App.Data.NoForce=true
    }
    App.Core.OnPlayerQishi=function(name, output, wildcards){
        App.Data.Qishi=wildcards[0]-0
    }
    App.Core.OnPlayerQishi2=function(name, output, wildcards){
        App.Data.Qishi=wildcards[0]-0
    }
    world.EnableTriggerGroup("combat", false)
})(App)
