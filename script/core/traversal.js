(function (App) {
    App.Core.Traversal = {}
    App.Data.Traversal = {}
    let pagesize = 10
    let publishgrid = function (grid, alldata) {
        let page = grid.getpage()
        let filter = grid.getfilter()
        let start = (page - 1) * pagesize
        let end = page * pagesize
        let count = 0
        grid.resetitems()
        for (let i = 0; i < alldata.length; i++) {
            let data = alldata[i]
            if (filter && data.indexOf(filter) < 0) {
                continue
            }
            count++
            if (count >= start && count < end) {
                grid.append(i, alldata[i])
            }
        }
        grid.setmaxpage(Math.ceil(count / pagesize))
        grid.publish("")
    }
    App.Core.Traversal.New = function (keyword) {
        App.Data.Traversal = {
            Key: keyword ? keyword : "",
            Vehicle:null,
            State:"",
        }
    }
    App.Core.Traversal.LastMove=null
    App.Traversal = function () {
        App.Core.Traversal.New("core.traversal.manual")
        App.Core.Traversal.Prompt()
    }
    App.Core.Traversal.Finish = function (full) {
        let g = App.NewGoal()
        if (!full) {
            g.FindKnownRoom()
        }
        App.LastMove.StateOnStep="finding"
        App.LastMove.WithData(g).Finish()
    }
    App.Core.Traversal.Continue = function () {
        App.LastMove.Continue()
    }
    App.Core.Traversal.Prompt = function () {
        App.Push(["core.state.traversal.manual"])
        App.Next()

    }
    App.Core.Traversal.Start = function () {
        App.Push(["core.state.traversal.traversal"])
        App.Next()
    }
    let Grid

    App.Core.Traversal.OnPage = function (name, id, code, data) {
        if (code == 0 && data) {
            Grid.setpage(data - 0)
            publishgrid(Grid, App.Info.PatrolsList)
        }
    }
    App.Core.Traversal.OnFilter = function (name, id, code, data) {
        if (code == 0) {
            Grid.setpage(1)
            Grid.setfilter(data)

            publishgrid(Grid, App.Info.PatrolsList)

        }
    }
    App.Core.Traversal.PromptTarget = function (title, desc, output) {
        App.Raise("traversal.prompttarget")
        if (App.Data.Traversal.Silence) {
            Note("静默模式")
            return
        }
        let vp = Userinput.newvisualprompt(title + " [ " + App.Data.Traversal.Key + " ]", desc, output)
        vp.setmediatype("output")
        vp.publish("App.Core.Traversal.OnTarget")
    }
    App.Core.Traversal.PromptTargetText = function (title, desc, lines) {
        App.Raise("traversal.prompttarget")
        if (App.Data.Traversal.Silence) {
            Note("静默模式")
            return
        }
        let vp = Userinput.newvisualprompt(title + " [ " + App.Data.Traversal.Key + " ]", desc, lines ? lines : "")
        vp.setmediatype("text")
        let target=GetVariable("__last__traversal__for")
        if (target){
            vp.SetValue(target)
        }
        vp.publish("App.Core.Traversal.OnTarget")
    }
    App.Core.Traversal.Target = function (data) {
        App.Data.Traversal.Target = data
        App.RaiseStateEvent("core.traversal.target")
    }

    App.Core.Traversal.OnTarget = function (name, id, code, data) {
        if (code == 0 && data) {
            SetVariable("__last__traversal__for",data)
            App.Core.Traversal.Target(data)
        } else {
            App.Core.Traversal.Target("")
        }
    }
    App.Core.Traversal.PickType = function () {
        App.Raise("traversal.picktype")
        if (App.Data.Traversal.Silence) {
            Note("静默模式")
            return
        }
        var List = Userinput.newlist("类型[" + App.Data.Traversal.Key + "]", "请选择你的遍历类型", false)
        List.append("room", "寻找房间")
        List.append("objid", "寻找对象id")
        List.append("objname", "寻找对象名")
        List.append("desc", "寻找描述")
        List.append("redbg", "寻找红底出口(输入房间名，*不指定房间)")
        List.append("herb", "寻找草药，输入随意非空文字")

        List.publish("App.Core.Traversal.OnPickType")
    }
    App.Core.Traversal.OnPickType = function (name, id, code, data) {
        if (code == 0) {
            App.Core.Traversal.Type(data)
        } else {
            App.Core.Traversal.Type("")
        }
    }
    App.Core.Traversal.Type = function (data) {
        App.Data.Traversal.Type = data
        App.RaiseStateEvent("core.traversal.type")
    }
    App.Core.Traversal.GetGoal = function () {
        if (App.Data.Traversal.Goal) {
            return App.Data.Traversal.Goal
        }
        let g = App.NewGoal(App.Data.Traversal.Target)
        switch (App.Data.Traversal.Type) {
            case "room":
                g.FindRoom()
                break
            case "objid":
                g.FindObjID()
                break
            case "objname":
                g.FindObjName()
                break
            case "objsuff":
                g.FindObjSuff()
                break
            case "desc":
                g.FindDesc()
                break
            case "redbg":
                g.FindRedBG()
                break
            case "herb":
                g.FindHerb()
                break
            case "custom":
                g.FindCustom()
                break
        }
        if (App.Data.Traversal.State){
            g.State=App.Data.Traversal.State
        }
        App.Data.Traversal.Goal = g
        return g
    }
    App.Core.Traversal.Show = function (title, desc) {
        App.Data.Traversal.Silence = false
        App.Data.Traversal.Title = title
        App.Data.Traversal.Desc = desc
        App.Data.Traversal.Answer = ""
        App.Raise("traversal.show")
        if (App.Data.Traversal.Silence) {
            Note("静默模式")
            return
        }
        Grid = Userinput.newdatagrid(title + " [ " + App.Data.Traversal.Key + " ]", desc)
        Grid.setpage(1)
        Grid.setfilter("")
        Grid.setonpage("App.Core.Traversal.OnPage")
        Grid.setonfilter("App.Core.Traversal.OnFilter")
        Grid.setonselect("App.Core.Traversal.OnAnswer")

        publishgrid(Grid, App.Info.PatrolsList)
    }
    App.Core.Traversal.Answer = function (answer) {
        App.Data.Traversal.Answer = answer
        App.RaiseStateEvent("core.traversal.answer")
    }
    App.Core.Traversal.OnAnswer = function (name, id, code, data) {
        Grid.hide()
        if (code == 0 && data) {
            App.Core.Traversal.Answer(App.Info.PatrolsList[data - 0])
        } else {
            App.Core.Traversal.Answer("")
        }
    }
    App.Core.Traversal.Combine = function (partols,startroom) {
        let from = startroom||""
        let to = startroom||""
        let path = []
        for (var i = 0; i < partols.length; i++) {
            let data = partols[i].split("||")
            let old = to
            to = data[2]
            if (!to) {
                throw "不能组合没有终点的路径"
            }
            if (i == 0&& !from) {
                from = data[1]
            } else {
                if (old != data[1]) {
                    let walk = App.API.GetPath(old, [data[1]])
                    if (walk == null) {
                        throw "无法找到[" + old + "]到[" + data[1] + "]路线,无法组合路径"
                    }
                    path = path.concat(walk.Command.split(";"))
                }
            }
            path = path.concat(data[3].split(";"))
        }
        return "||" + from + "||" + to + "||" + path.join(";")
    }
    App.RegisterState(new (Include("core/state/traversal/traversal.js"))())
    App.RegisterState(new (Include("core/state/traversal/arrive.js"))())
    App.RegisterState(new (Include("core/state/traversal/manual.js"))())
    App.RegisterState(new (Include("core/state/traversal/look.js"))())

})(App)