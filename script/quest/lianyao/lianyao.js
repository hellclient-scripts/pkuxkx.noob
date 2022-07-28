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
        },
        "上等金创药":{
            "xue jie":6,
            "dan nanxing":6,
            "dang gui":4,
        },
        "极品金创药":{
            "xue jie":8,
            "dan nanxing":8,
            "dang gui":5,
        },
        "毒草类初级解药":{
            "qiannian renshenpian":1,
            "zhu sha":1,
        }
    }
    App.Quest.Lianyao.Formula={}
    App.Quest.Lianyao.Start=function(formula){
        let f=App.Quest.Lianyao.Formulas[formula]
        if (f==null){
            Note("未知的配方:["+formula+"]")
            Note("可用配方为 "+Object.keys(App.Quest.Lianyao.Formulas).join(" | "))
            App.Fail()
            return
        }
        App.Quest.Lianyao.Formula=f
        App.Commands([
            App.NewCommand("eat"),
            App.NewCommand("do","i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("state","core.state.quest.lianyao.lianyao")
        ]).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/lianyao/lianyao.js"))())
    })(App)