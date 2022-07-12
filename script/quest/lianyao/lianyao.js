(function(App){
    App.Quest.Lianyao={}
    App.Quest.Lianyao.Data={
        Type:""
    }
    App.Quest.Lianyao.Formulas={
        "金创药":{
            "xue jie":2,
            "dan nanxing":2,
            "dang gui":1,
        }
    }
    App.Quest.Lianyao.Formula={}
    App.Quest.Lianyao.Start=function(formula){
        let f=App.Quest.Lianyao.Formulas[formula]
        if (f==null){
            Note("未知的配方:["+formula+"]")
            App.Fail()
        }
        App.Quest.Lianyao.Formula=f
        App.Commands([
            App.NewCommand("do","i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("state","core.state.quest.lianyao.lianyao")
        ]).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/lianyao/lianyao.js"))())
    })(App)