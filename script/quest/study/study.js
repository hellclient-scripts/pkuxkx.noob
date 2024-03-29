(function (App) {
    let study = Include("include/study.js")
    App.Quest.Study = {}
    App.Quest.Study.PerLoop = 1
    App.Quest.Study.Index = 0
    App.Quest.Study.Plan = []
    App.Quest.Study.Current = null
    App.Quest.Study.Pause = false
    App.Quest.Study.PickPlan = function () {
        let available = []
        App.Quest.Study.Plan.forEach(p => {
            if (App.Data.HP["pot"] < 50 && p.Type == "xue") {
                return
            }
            let skill = App.Core.PlayerGetSkillByID(p.Skill)
            if (skill != null) {
                if (p.Type == "xiulian" && App.Data.HP["pot"] < skill.Level * 5) {
                    return
                }
                let max = p.Max - 0
                if (isNaN(max) && p.Max) {
                    let maxskill = p.Max
                    let offset = 0
                    switch (maxskill[0]) {
                        case "-":
                            var data = maxskill.slice(1).trim().split(" ")
                            if (data.length > 1) {
                                maxskill = data[1]
                                offset = 0 - (data[0])
                            } else {
                                maxskill = data[0]
                                offset = -1
                            }

                            break
                        case "+":
                            var data = maxskill.slice(1).trim().split(" ")
                            if (data.length > 1) {
                                maxskill = data[1]
                                offset = 1 * (data[0])
                            } else {
                                maxskill = data[0]
                                offset = 1
                            }
                            break
                    }
                    let sk = App.Core.PlayerGetSkillByID(maxskill)
                    if (sk) {
                        max = Math.floor(sk.Level) + offset
                    } else {
                        max = 0
                    }
                }
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
                if (p.Type == "lingwu" || p.Type == "lingwu2") {
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
                case "lingwu2":
                case "lingwu": location = App.GetSleepRooms()
                    break
                default:
                    throw "学习[" + type + "]位置不可为空"
                    break
            }
        }
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
                cmd = "lian " + study.Target + " " + (study.Per ? study.Per : "50")
                break
            case "lingwu":
                cmd = "lingwu " + study.Skill + " " + (study.Per ? study.Per : "100")
                break
            case "lingwu2":
                cmd = "lingwu " + study.Skill
                break
            case "read":
                cmd = "du " + study.Target + " for " + (study.Per ? study.Per : "50")
                break
            case "cmd":
                cmd = study.Target + ""
                break
            case "xiulian":
                cmd = "xiulian " + study.Skill
                break
            default:
                throw "学习方式[" + study.Type + "]未知"
        }
        let commands = []
        for (var loop = 0; loop < study.Loop; loop++) {
            let cmds = []
            for (var i = 0; i < study.Times; i++) {
                cmds.push(cmd)
            }
            if (App.Quest.Study.Current.Before) {
                commands.push(App.NewCommand("do", App.Quest.Study.Current.Before),
                )
            }
            commands.push(App.NewCommand("do", cmds.join(";")))
            if (!(study.Loop > 1)) {
                commands.push(App.NewCommand("nobusy"))
            }
        }
        if (App.Quest.Study.Current.After) {
            commands.push(App.NewCommand("do", App.Quest.Study.Current.After))
        }
        if (study.Loop > 1) {
            commands.push(App.NewCommand("nobusy"))
        }
        App.Commands(commands).Push()
        App.Raise("core.looping")
        App.Next()
    }
    App.Quest.Study.Xue = function () {
        let pot = 50
        if (pot > App.Data.HP["pot"]) { pot = App.Data.HP["pot"] }
        return 'xue ' + App.Quest.Study.Current.Target + " for " + App.Quest.Study.Current.Skill + " " + pot
    }
    let re = /\n/g
    App.Quest.Study.Start = function (cmd) {
        App.Quest.Study.Pause = false
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
    App.Quest.Study.Start2 = function () {
        App.Quest.Study.Pause = false
        App.Quest.Study.Index = 0
        App.Commands([
            App.NewCommand('prepare', App.PrapareFull),
            App.NewCommand('do', "skills"),
            App.NewCommand('function', function () {
                App.Quest.Study.Exec(world.GetVariable("study2").replace(re, ","))
            }),
        ]).Push()
        App.Next()
    }
    App.Quest.Study.Start3 = function () {
        App.Quest.Study.Pause = false
        App.Quest.Study.Index = 0
        App.Commands([
            App.NewCommand('prepare', App.PrapareFull),
            App.NewCommand('do', "skills"),
            App.NewCommand('function', function () {
                App.Quest.Study.Exec(world.GetVariable("study3").replace(re, ","))
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
        if (!App.Stopped) {
            App.Commands([
                App.NewCommand('function', App.Quest.Study.PickPlan),
                App.NewCommand('function', App.Quest.Study.Move),
                App.NewCommand('function', function () {
                    App.Quest.Study.Loop(cmd)
                }),
            ]).Push()
        }
        App.Next()
    }
    App.RegisterCallback("quest.study.pause", function () {
        App.Quest.Study.Pause = true
    })
    App.Bind("here", "quest.study.pause")
    App.Quest.Study.Loop = function (cmd) {
        if (App.Quest.Study.Index < App.Quest.Study.PerLoop && !(App.Stopped || App.Quest.Study.Pause)) {
            App.Quest.Study.Index++
            App.Quest.Study.Exec(cmd)
        } else {
            App.Next()
        }
    }
})(App)