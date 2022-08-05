(function(App){
    App.Quest.Lianyao={}
    App.Quest.Lianyao.Data={
        Type:""
    }
    App.Quest.Lianyao.Items={
        "huo zhezi":["buy huo zhezi"],
        "xue jie":["buy xue jie"],
        "dan nanxing":["buy dan nanxing"],
        "dan nanxing":["buy dang gui"],
        "dang shen":["buy dang shen"],
        "zhu sha":["buy zhu sha"],
        "yuan zhi":["buy yuan zhi"],
        "he huan":["buy he huan"],
        "sang zhi":["buy sang zhi"],
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
            "dang shen":1,
            "zhu sha":2,
            "yuan zhi":2,
        },
        "上等金创药":{
            "xue jie":6,
            "dan nanxing":6,
            "dang gui":4,
        },
        "上等养精丹":{
            "dang shen":4,
            "zhu sha":6,
            "yuan zhi":6,
        },
        "雪参玉蟾丹":{
            "dang shen":3,
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
            "dang shen":5,
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
        "jkf":{"yp":"jkfyp","gj":"jkfypgj"},
        "linan":{"yp":"linanyp","gj":"linanypgj"},
        // "qhmz":
    }
    App.Quest.Lianyao.Formula={}
    App.Quest.Lianyao.Location=null
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
    App.Quest.Lianyao.Buy=function(item){
        Note("补充"+item)
        let itemcmds=App.Quest.Lianyao.Items[item]
        if (!itemcmds){
            throw("无法获取的道具["+item+"]")
        }
        let cmds=[
            App.NewCommand("to",App.Options.NewWalk(App.Quest.Lianyao.Location["yp"])),
        ]
        for (var i=0;i<itemcmds.length;i++){
            cmds.push(App.NewCommand("do",itemcmds[i]))
            cmds.push(App.NewCommand("nobusy"))
        }
        cmds=cmds.concat([
            App.NewCommand("do","i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",App.Quest.Lianyao.Check),
        ])
        App.Commands(cmds).Push()
        App.Next()
    }
    App.Quest.Lianyao.Check=function(){
        if (App.GetItemNumber("huo zhezi", true) < 1) {
            App.Quest.Lianyao.Buy("huo zhezi")
            return
        }
        for (var key in App.Quest.Lianyao.Formula) {
            if (App.GetItemNumber(key, true) < App.Quest.Lianyao.Formula[key]) {
                App.Quest.Lianyao.Buy(key)
                return
            }
        }
        App.Commands([
            App.NewCommand("to",App.Options.NewWalk(App.Quest.Lianyao.Location["gj"])),
            App.NewCommand("nobusy"),
            App.NewCommand("state","core.state.quest.lianyao.lianyao")
        ]).Push()
        App.Next()

    }
    App.Quest.Lianyao.Yaopu=function(area,formula){
        let location=Locations[area]
        if (!location){
            Note("可用区域为 "+Object.keys(Locations).join(" | "))
            throw("药铺配药需要指定具体药铺")
        }
        
        let f=App.Quest.Lianyao.Formulas[formula]
        if (f==null){
            Note("可用配方为 "+Object.keys(App.Quest.Lianyao.Formulas).join(" | "))
            throw("未知的配方:["+formula+"]")
            return
        }
        App.Quest.Lianyao.Formula=f
        App.Quest.Lianyao.Location=location
        App.Core.Sell.SetNoSell("Huo zhezi")
        for (var key in f) {
            App.Core.Sell.SetNoSell(key)
        }
        App.Commands([
            App.NewCommand("prepare", App.PrapareFull),
            App.NewCommand("function",App.Quest.Lianyao.Check),
        ]).Push()
        App.Next()
    }
    App.RegisterState(new (Include("core/state/quest/lianyao/lianyao.js"))())
    })(App)