(function (App) {
    App.Core.Traversal = {}
    App.Data.Traversal={}
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
    App.Traversal=function(){
        App.Push(["core.state.traversal.manual"])
        App.Next()
    }
    App.Core.Traversal.Start=function(){
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
    App.Core.Traversal.PromptTarget = function (key, title, desc, output) {
        let vp = Userinput.newvisualprompt(title + " [ " + key + " ]", desc, output)
        vp.setmediatype("output")
        vp.publish("App.Core.Traversal.OnTarget")
    }
    App.Core.Traversal.PromptTargetText = function (key, title, desc, lines) {
        let vp = Userinput.newvisualprompt(title + " [ " + key + " ]", desc, lines?lines:"")
        vp.setmediatype("text")
        vp.publish("App.Core.Traversal.OnTarget")
    }
    App.Core.Traversal.Target = function (data) {
        App.Data.Traversal.Target = data
        App.OnStateEvent("core.traversal.target")
    }

    App.Core.Traversal.OnTarget = function (name, id, code, data) {
        Userinput.hideall()
        if (code == 0 && data) {
            App.Core.Traversal.Target(data)
        } else {
            App.Core.Traversal.Target("")
        }
    }
    App.Core.Traversal.PickType = function () {
        var List = Userinput.newlist("类型", "请选择你的遍历类型", false)
        List.append("room", "寻找房间")
        List.append("objid", "寻找对象id")
        List.append("objname", "寻找对象名")
        List.append("desc", "寻找描述")
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
        App.OnStateEvent("core.traversal.type")
    }
    App.Core.Traversal.GetGoal = function () {
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
            case "desc":
                g.FindDesc()
                break
        }
        return g
    }
    App.Core.Traversal.Show = function (key, title, desc) {
        App.Data.Traversal.Key = key
        App.Data.Traversal.Silence = false
        App.Data.Traversal.Title = title
        App.Data.Traversal.Desc = desc
        App.Data.Traversal.Answer = ""
        App.Raise("puzzle")
        if (App.Data.Traversal.Silence) {
            return
        }
        Grid = Userinput.newdatagrid(title + " [ " + key + " ]", desc)
        Grid.setpage(1)
        Grid.setfilter("")
        Grid.setonpage("App.Core.Traversal.OnPage")
        Grid.setonfilter("App.Core.Traversal.OnFilter")
        Grid.setonselect("App.Core.Traversal.OnAnswer")

        publishgrid(Grid, App.Info.PatrolsList)
    }
    App.Core.Traversal.Answer = function (answer) {
        App.Data.Traversal.Answer = answer
        App.OnStateEvent("core.traversal.answer")
    }
    App.Core.Traversal.OnAnswer = function (name, id, code, data) {
        Grid.hide()
        if (code == 0 && data) {
            App.Core.Traversal.Answer(App.Info.PatrolsList[data-0])
        } else {
            App.Core.Traversal.Answer("")
        }
    }
    App.RegisterState(new (Include("core/state/traversal/traversal.js"))())
    App.RegisterState(new (Include("core/state/traversal/arrive.js"))())
    App.RegisterState(new (Include("core/state/traversal/manual.js"))())
})(App)