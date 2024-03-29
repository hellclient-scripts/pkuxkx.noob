(function(App){
    App.Quest.Lianyao={}
    App.Quest.Lianyao.Data={
        Type:""
    }
    App.Quest.Lianyao.Items={
        "huo zhezi":{cmd:["buy huo zhezi 5"]},
        "xue jie":{cmd:["buy xue jie 20"]},
        "dan nanxing":{cmd:["buy dan nanxing 20"]},
        "dang gui":{cmd:["buy dang gui 10"]},
        "dang shen":{cmd:["buy dang shen 10"]},
        "zhu sha":{cmd:["buy zhu sha 20"]},
        "yuan zhi":{cmd:["buy yuan zhi 20"]},
        "he huan":{cmd:["buy he huan 10"]},
        "sang zhi":{cmd:["buy sang zhi 10"]},
        "qiannian renshenpian":{cmd:["buy qiannian renshen","qie qiannian renshen"],loc:"jkfyp"},
        "qiannian lingzhipian":{cmd:["buy ling zhi","qie ling zhi"],loc:"jkfyp"},
        "yuxing cao":{cmd:["buy im_84"],loc:"suzhoudp"},
        "fu ling":{cmd:["buy im_319"],loc:"suzhoudp"},
        "shedan":{cmd:["buy im_745"],loc:"suzhoudp"},
        "ding xiang":{cmd:["buy im_75"],loc:"suzhoudp"},
        "jixue teng":{cmd:["buy im_892"],loc:"suzhoudp"},
        "chang shan":{cmd:["buy im_78"],loc:"suzhoudp"},
        "fupen zi":{cmd:["buy im_14"],loc:"linandp"},
        "jing jie":{cmd:["buy im_463"],loc:"linandp"},

    }
    App.Quest.Lianyao.ItemsHome={
        "huo zhezi":{cmd:["buy huo zhezi"]},
        "xue jie":{cmd:["buy xue jie"]},
        "dan nanxing":{cmd:["buy dan nanxing"]},
        "dang gui":{cmd:["buy dang gui"]},
        "dang shen":{cmd:["buy dang shen"]},
        "zhu sha":{cmd:["buy zhu sha"]},
        "yuan zhi":{cmd:["buy yuan zhi"]},
        "he huan":{cmd:["buy he huan"]},
        "sang zhi":{cmd:["buy sang zhi"]},
        "qiannian renshenpian":{cmd:["buy qiannian renshen","qie qiannian renshen"],loc:"jkfyp"},
        "qiannian lingzhipian":{cmd:["buy ling zhi","qie ling zhi"],loc:"jkfyp"},
        "jixue teng":{cmd:["buy im_892"],loc:"suzhoudp"},
        "chang shan":{cmd:["buy im_78"],loc:"suzhoudp"},
        "bo he":{cmd:["buy im_10"],loc:"linandp"},
        "yuxing cao":{cmd:["buy im_84"],loc:"suzhoudp"},
        "fu ling":{cmd:["buy im_319"],loc:"suzhoudp"},
        "ding xiang":{cmd:["buy im_75"],loc:"suzhoudp"},
        "fupen zi":{cmd:["buy im_14"],loc:"linandp"},
        "jing jie":{cmd:["buy im_463"],loc:"linandp"},
        "shedan":{cmd:["buy im_745"],loc:"suzhoudp"},
        "pipa ye":{cmd:["buy im_610"],loc:"linandp"},
        "feng jia":{cmd:["pickgem x4a;pickgem q4b"],loc:"linandp"},
        "feng gu":{cmd:["pickgem g4a;pickgem g4b"],loc:"linandp"},
        "lei jiao":{cmd:["pickgem q5a;pickgem q5b"],loc:"linandp"},
        "lei yu":{cmd:["pickgem f5a;pickgem f5b"],loc:"linandp"},
        "shui bing":{cmd:["pickgem b3a"],loc:"linandp"},
        "shui sui":{cmd:["pickgem s3c"],loc:"linandp"},
        "feng sui":{cmd:["pickgem s4c"],loc:"linandp"},
        "feng bing":{cmd:["pickgem b4a"],loc:"linandp"},
        "chuan bei":{cmd:["buy im_11"],loc:"linandp"},
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
        "极品养精丹":{
            "dang shen":5,
            "zhu sha":8,
            "yuan zhi":8,
        },
        "极品金创药":{
            "xue jie":8,
            "dan nanxing":8,
            "dang gui":5,
        },
        "蛇胆川贝枇杷膏":{
            "chuan bei":1,
            "shedan":1,
            "pipa ye":1,
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
        },
        "毒草类初级解药":{
            "qiannian renshenpian":1,
            "zhu sha":1,
        },
        "冰麟丹":{
            "bo he":1,
            "jixue teng":1,
            "lei jiao":1,
            "shui bing":1,
        },
        "天羽丸":{
            "fu lin":1,
            "yuxing cao":1,
            "lei yu":1,
            "shui sui":1,
        },
        "冰龙散":{
            "fupen zi":1,
            "dang gui":1,
            "feng gu":1,
            "feng bing":1,
        },
        "集气散":{
            "ding xaing":1,
            "he huan":1,
            "feng jia":1,
            "feng sui":1,
        },
        "手动":{
        }
    }
    let Locations={
        "jkf":{"yp":"jkfyp","gj":"jkfypgj"},
        "linan":{"yp":"linanyp","gj":"linanypgj"},
        "home":{"yp":"linanyp","gj":"home-linan","home":true},
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
        let itemcmds=App.Quest.Lianyao.Location.home?App.Quest.Lianyao.ItemsHome[item]:App.Quest.Lianyao.Items[item]
        if (!itemcmds){
            throw("无法获取的道具["+item+"]")
        }
        let cmds=[
            App.NewCommand("to",App.Options.NewWalk(itemcmds.loc?itemcmds.loc:App.Quest.Lianyao.Location["yp"])),
        ]
        for (var i=0;i<itemcmds.cmd.length;i++){
            cmds.push(App.NewCommand("do",itemcmds.cmd[i]))
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
    App.Quest.Lianyao.Drop=function(){
        App.Commands([
            App.NewCommand("to",App.Options.NewWalk(App.Quest.Lianyao.Location["yp"])),
            App.NewCommand("do","drop lu zha;i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",App.Quest.Lianyao.Check),
        ]).Push()
        App.Next()
    }
    App.Quest.Lianyao.Check=function(){
        if (App.GetItemNumber("lu zha", true) >0 ) {
            App.Quest.Lianyao.Drop()
            return
        }
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