(function(App){
    App.Quest.Lianyao={}
    App.Quest.Lianyao.Data={
        Type:""
    }
    App.Quest.Lianyao.Items={
        "xue jie":["buy xue jie"],
        "dan nanxing":["buy dan nanxing"],
        "dan nanxing":["buy dang gui"],
        "dang sheng":["buy dang sheng"],
        "zhu sha":["buy zhu sha"],
        "yuan zhi":["buy yuan zhi"],
        "he huan":["buy he huan"],
        "sang zhi":["buy he huan"],
        "qiannian renshenpian":["buy qiannian renshen","qie qiannian renshen"],
        "qiannian lingzhipian":["buy ling zhi","qie ling zhi"]

    }
    App.Quest.Lianyao.Formulas={
        "*":{
        },
        "金创药":{
            "xue jie":2,
            "dan nanxing":2,
            "dang gui":1,
        },
        "养精丹":{
            "dang sheng":1,
            "zhu sha":2,
            "yuan zhi":2,
        },
        "上等金创药":{
            "xue jie":6,
            "dan nanxing":6,
            "dang gui":4,
        },
        "上等养精丹":{
            "dang sheng":4,
            "zhu sha":6,
            "yuan zhi":6,
        },
        "雪参玉蟾丹":{
            "dang sheng":3,
            "he huan":2,
            "sang zhi":2
        },
        "千年灵芝丹":{
            "yuan zhi":2,
            "qiannian lingzhipian":1,
        },
        "千年参王丸":{
            "yuan zhi":2,
            "qiannian renshenpian":1,
        },
        "极品金创药":{
            "xue jie":8,
            "dan nanxing":8,
            "dang gui":5,
        },
        "极品养精丹":{
            "dang sheng":5,
            "zhu sha":8,
            "yuan zhi":8,
        },
        "青龙丹":{
            "qiannian lingzhipian":1,
            "zhu sha":1,
        },
        "毒虫类初级解药":{
            "qiannian lingzhipian":1,
            "zhu sha":1,
        },
        "毒草类初级解药":{
            "qiannian renshenpian":1,
            "zhu sha":1,
        }
    }
    let Locations={
        "jfk":"jkfyp",
        "linan":"linanyp",
        // "qhmz":
    }
    App.Quest.Lianyao.Formula={}
    App.Quest.Lianyao.Start=function(formula){
        let f=App.Quest.Lianyao.Formulas[formula]
        if (f==null){
            Note("可用配方为 "+Object.keys(App.Quest.Lianyao.Formulas).join(" | "))
            throw("未知的配方:["+formula+"]")
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
    App.Quest.Lianyao.Yaopu=function(area,formula){
        let location=Locations[area]
        if (!location){
            Note("可用区域为 "+Object.keys(App.Quest.Lianyao.Locations).join(" | "))
            throw("药铺配药需要指定具体药铺")
        }
        
        let f=App.Quest.Lianyao.Formulas[formula]
        if (f==null){
            Note("可用配方为 "+Object.keys(App.Quest.Lianyao.Formulas).join(" | "))
            throw("未知的配方:["+formula+"]")
            return
        }
        App.Quest.Lianyao.Formula=f
        App.Core.Sell.SetNoSell("Huo zhezi")
        for (var key in f) {
            App.Core.Sell.SetNoSell(key)
        }
        App.Commands([
            App.NewCommand("prepare", App.PrapareFull),
            App.NewCommand("nobusy"),
            App.NewCommand("state","core.state.quest.lianyao.lianyao")
        ]).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/lianyao/lianyao.js"))())
    })(App)