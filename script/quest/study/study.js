(function (App) {
    let study = Include("include/study.js")
    App.Quest.Study = {}
    App.Quest.Study.PerLoop = 10
    App.Quest.Study.Index = 0
    App.Quest.Study.Plan = []
    App.Quest.Study.Current = null
    App.Quest.Study.PickPlan = function () {
        let available = []
        App.Quest.Study.Plan.forEach(p => {
            if (App.Data.HP["pot"] < 50 && p.Type == "xue") {
                return
            }
            skill = App.Core.PlayerGetSkillByID(p.Skill)
            if (skill != null) {
                if (p.Type=="xiulian" && App.Data.HP["pot"]<skill.Level*5){
                    return
                }
                let max = p.Max
                if (max <= 0) {
                    max = skill.Max
                }
                if (skill.Level >= max) {
                    return
                }
                if (p.Type == "lian") {
                    let base = App.Core.PlayerGetSkillByID(p.Target)
                    if (base != null) {
                        if (skill.Level >= Math.floor(base.Level)) {
                            return
                        }
                    }
                }
                if (p.Type == "lingwu") {
                    let high = App.Core.PlayerGetSkillByID(p.Target)
                    if (high != null) {
                        if (Math.floor(skill.Level) > Math.floor(high.Level)) {
                            return
                        }
                    }
                }
            }
            available.push(p)
        })
        if (available.length == 0) {
            App.Fail()
            return
        }
        App.Quest.Study.Current = RandomList(available)
        App.Next()
    }
    App.Quest.Study.Move = function () {
        let type = App.Quest.Study.Current.Type
        let location = App.Quest.Study.Current.Location
        if (!location) {
            switch (type) {
                case "lian":
                case "read":
                case "xiulian":
                    location = App.GetSleepRooms()
                    break
                case "lingwu":
                    location = App.GetSleepRooms()
                    break
                default:
                    throw "学习[" + type + "]位置不可为空"
                    break
            }
        }
        App.Raise("quest.set", "学习 " + App.Quest.Study.Current.Type + " " + App.Quest.Study.Current.Skill + "@" + location)
        App.Commands([
            App.NewCommand('to', App.Options.NewWalk(location)),
            App.NewCommand('nobusy'),
            App.NewCommand('do', "yun recover;yun regenerate"),
            App.NewCommand('function', App.Quest.Study.Execute),
        ]).Push()
        App.Next()
    }
    App.Quest.Study.Execute = function () {
        let study = App.Quest.Study.Current
        let cmd = ""
        switch (study.Type) {
            case 'xue':
                cmd = App.Quest.Study.Xue()
                break
            case "lian":
                cmd = "lian " + study.Target + " 50"
                break
            case "lingwu":
                cmd = "lingwu " + study.Skill + " 50"
                break
            case "read":
                cmd = "du " + study.Target + " for 50"
                break
            case "cmd":
                cmd = study.Target
                break
            case "xiulian":
                cmd = "xiulian " + study.Skill
                break
            default:
                throw "学习方式[" + study.Type + "]未知"
        }
        let cmds = []
        for (var i = 0; i < study.Times; i++) {
            cmds.push(cmd)
        }
        let commands = []
        if (App.Quest.Study.Current.Before) {
            commands.push(App.NewCommand("do", App.Quest.Study.Current.Before),
            )
        }
        commands.push(App.NewCommand("do", cmds.join(";")))
        commands.push(App.NewCommand("nobusy"))
        if (App.Quest.Study.Current.After) {
            commands.push(App.NewCommand("do", App.Quest.Study.Current.After))
        }
        App.Commands(commands).Push()
        App.Next()
    }
    App.Quest.Study.Xue = function () {
        let pot = 50
        if (pot > App.Data.HP["pot"]) { pot = App.Data.HP["pot"] }
        return 'xue ' + App.Quest.Study.Current.Target + " for " + App.Quest.Study.Current.Skill + " " + pot
    }
    let re = /\n/g
    App.Quest.Study.Start = function (cmd) {
        App.Quest.Study.Index = 0
        App.Commands([
            App.NewCommand('prepare', App.PrapareFull),
            App.NewCommand('do', "skills"),
            App.NewCommand('function', function () {
                App.Quest.Study.Exec(cmd)
            }),
        ]).Push()
        App.Next()
    }
    App.Quest.Study.Exec = function (cmd) {
        if (cmd == "") {
            cmd = world.GetVariable("study").replace(re, ",")
        }
        let data = cmd.split(",")
        App.Quest.Study.Plan = []
        data.forEach(value => {
            if (value) {
                App.Quest.Study.Plan.push(new study(value))
            }
        });
        App.Commands([
            App.NewCommand('function', App.Quest.Study.PickPlan),
            App.NewCommand('function', App.Quest.Study.Move),
            App.NewCommand('function', function () {
                App.Quest.Study.Loop(cmd)
            }),
        ]).Push()
        App.Next()
    }
    App.Quest.Study.Loop = function (cmd) {
        if (App.Quest.Study.Index < App.Quest.Study.PerLoop&&!App.Stopped) {
            App.Quest.Study.Index++
            App.Quest.Study.Exec(cmd)
        } else {
            App.Next()
        }
    }
})(App)