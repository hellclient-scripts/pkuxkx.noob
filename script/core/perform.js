(function (App) {
    let Action = Include("include/action.js")
    let Perform = Include("include/perform.js")

    App.Core.Perform = {}
    App.Core.Perform.Cooldown = {}
    App.Core.Perform.All = {}
    App.Core.Perform.UpdateCooldown = function (line) {
        for (var id in App.Core.Perform.All) {
            let pfm = App.Core.Perform.All[id]
            let cd = pfm.CaclCooldown(line)
            switch (cd) {
                case -1:
                    break
                case 0:
                    cd = pfm.Cooldown
                default:
                    let next = Now() + cd * 1000
                    App.Core.Perform.Cooldown[id] = next
                    Note("绝招[" + id + "]进入" + cd + "秒冷却")
                    if (pfm.Group) {
                        App.Core.Perform.Cooldown[pfm.Group] = next
                        Note("绝招组[" + pfm.Group + "]进入" + cd + "秒冷却")
                    }
                    break
            }
        }
    }
    App.Core.Perform.Execute = function (id, target) {
        let pfm = App.Core.Perform.All[id]
        if (!pfm) {
            Note("绝招[" + id + "]未找到")
            return false
        }
        let cd = App.Core.Perform.Cooldown[id] || 0
        let gcd = pfm.Group ? App.Core.Perform.Cooldown[pfm.Group] : 0
        if (!gcd) {
            gcd = 0
        }
        if (cd < gcd) {
            cd = gcd
        }
        if (Now() <= cd) {
            Note("绝招[" + id + "]冷却中")
            return false
        }
        if (App.Core.Combat.Current.Weapon && pfm.Weapon && (pfm.Weapon != App.Core.Combat.Current.Weapon) && App.Core.Combat.Current.WeaponCooldown > 0) {
            Note("绝招[" + id + "]兵器 " + pfm.Weapon + " 冲突")
            return false
        }
        Note("使用绝招[" + id + "]")
        pfm.Execute(target)
        return true
    }
    App.Core.Perform.LoadActions = function (data) {
        let lines = data.split("\n")
        let result = []
        for (var i = 0; i < lines.length; i++) {
            let line = lines[i].trim()
            if (line) {
                let action = new Action(line)
                result.push(action)
            }
        }
        return result
    }

    App.Core.Perform.Load = function () {
        let v = GetVariable("performs").trim()
        if (v) {
            Note("")
            Note("初始化绝招")
            let actions = App.Core.Perform.LoadActions(v)
            for (var i = 0; i < actions.length; i++) {
                let action = actions[i]
                let id = action.Command.slice(1)
                if (!id) {
                    Note("绝招ID不可为空，请检查设置" + " (" + action.Line + ")")
                }
                if (action.Param == "") {
                    if (!action.Data) {
                        Note("绝招ID[" + id + "]触发不可为空" + " (" + action.Line + ")")
                        continue
                    }
                    let reg
                    try {
                        reg = new RegExp(action.Data)
                    } catch (error) {
                        Note("绝招ID[" + id + "]的触发 [" + action.Data + "]无效" + " (" + action.Line + ")")
                        continue
                    }
                    App.Core.Perform.All[id] = new Perform(id, reg)
                    Note("定义绝招ID[" + id + "][" + action.Data + "]" + "成功。")
                    continue
                }
                let perform = App.Core.Perform.All[id]
                if (!perform) {
                    Note("绝招ID[" + id + "]未找到，请检查设置" + " (" + action.Line + ")")
                    continue
                }
                let param = action.Param ? action.Param.split(".") : [""]
                switch (param[0]) {
                    case "cd":
                        let cd = action.Data - 0
                        if (isNaN(cd)) {
                            Note("绝招ID[" + id + "]的冷却时间" + action.Data + "无效" + " (" + action.Line + ")")
                        } else {
                            perform.Cooldown = cd
                            Note("绝招ID[" + id + "]的冷却时间设置为 " + action.Data + "秒")
                        }
                        break
                    case "group":
                        perform.Group = action.Data.trim()
                        Note("绝招ID[" + id + "]的冷却组设置为 " + perform.Group)
                        continue
                    case "send":
                        perform.AddCommand(action.Data, false)
                        Note("绝招ID[" + id + "]添加不带目标指令 " + action.Data)
                        continue
                    case "sendon":
                        perform.AddCommand(action.Data, true)
                        Note("绝招ID[" + id + "]添加带目标指令 " + action.Data)
                        continue
                    case "use":
                        perform.AddUse(action.Data, param[1])
                        Note("绝招ID[" + id + "]添加高兵指令，将 " + action.Data + " 作为 " + param[1] + " 使用")
                        break
                    case "weapon":
                        perform.SetWeapon(action.Data, param[1]?(param[1]-0):0)
                        Note("绝招ID[" + id + "]添加武器指令，高兵使用主武器为 " + action.Data + " 并锁定 " + (param[1]?param[1]:0) + " 秒。")
                        break
                    case "trigger":
                        let tricd = 0
                        if (param.length > 1) {
                            tricd = param[1] - 0
                            if (isNaN(tricd)) {
                                Note("绝招ID[" + id + "]的触发 [" + action.Data + "]" + "冷却时间" + param[1] + "无效" + " (" + action.Line + ")")
                                continue
                            }
                        }
                        let reg
                        try {
                            reg = new RegExp(action.Data)
                        } catch (error) {
                            Note("绝招ID[" + id + "]的触发 [" + action.Data + "]无效" + " (" + action.Line + ")")
                            continue
                        }
                        perform.AddTrigger(reg, tricd)
                        Note("绝招ID[" + id + "]的触发 [" + action.Data + "]" + "添加成功，冷却时间为" + (tricd ? (tricd + "秒") : "默认"))
                        continue
                }

            }
            Note("绝招初始化完毕")
            Note("")
        }
    }
    App.RegisterCallback("core.perform.load", function () {
        App.Core.Perform.Load()
    })
    App.Bind("Intro", "core.perform.load")
})(App)