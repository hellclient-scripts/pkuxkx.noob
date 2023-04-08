(function (App) {
    App.Quest.CombineGem = {}
    App.Quest.CombineGem.Data = {
        Todo: [],
        Index: 1,
    }
    App.Quest.CombineGem.Levels = ["di", "shan", "shui", "feng", "lei", "huo", "ze"]
    App.Quest.CombineGem.Gems = ["yan", "bing", "jin", "mu", "sui", "ri", "yue", "jia", "gu", "jiao", "yu"]
    App.Quest.CombineGem.Start = function (param) {
        let max = App.Quest.CombineGem.Levels.length
        if (param) {
            max = param - 0
            if (max == NaN || max < 0) {
                throw "无效的合并宝石参数。合并宝石参数应该是正整数"
            }
            if (max>App.Quest.CombineGem.Levels.length){
                max=App.Quest.CombineGem.Levels.length
            }
        }
        App.Quest.CombineGem.Data = {
            Todo: [],
            Index: 1,
        }
        for (var i = 0; i < max; i++) {
            for (var k = 0; k < App.Quest.CombineGem.Gems.length; k++) {
                App.Quest.CombineGem.Data.Todo.push(App.Quest.CombineGem.Levels[i] + " " + App.Quest.CombineGem.Gems[k])
            }
        }
        App.Quest.CombineGem.Check()
    }
    App.Quest.CombineGem.Filter=function(){
        var gems={}
        for(var i=App.Data.ItemList.Items.length-1;i>-1;i--){
            let id=App.Data.ItemList.Items[i].ID.toLowerCase()
            if (gems[id]==null){
                gems[id]=0
            }
            gems[id]++
        }
        while(App.Quest.CombineGem.Data.Todo.length>0){
            let id=App.Quest.CombineGem.Data.Todo[0]
            if (!gems[id]||gems[id]<3){
                App.Quest.CombineGem.Data.Todo=App.Quest.CombineGem.Data.Todo.slice(1)
                continue
            }
            break
        }
        App.Next()
    }
    App.Quest.CombineGem.Check = function () {
        let packloc="jxj"
        let combineloc="jxj"
        if (App.Quest.CombineGem.Data.Todo.length == 0) {
            Note("合成宝石结束,收起所有宝石,进入冷却1秒")
            App.Core.Quest.Cooldown("combinegem",1000)
            // let packloc=App.GetSafeRoom()
            // if (App.Info.HomeRooms[packloc]){
            //     packloc="yz-sczh"
            // }
            App.Commands([
                App.NewCommand("to", App.Options.NewWalk(packloc)),
                App.NewCommand("function",App.PackGem),
                App.NewCommand("to", App.Options.NewWalk(combineloc)),
            ]).Push()
            App.Next()
            return
        }
        App.Commands([
            App.NewCommand('prepare', App.PrapareFullExcept(["asset"])),
            App.NewCommand("neili", 1000),
            App.NewCommand("nobusy"),
            App.NewCommand("to", App.Options.NewWalk(combineloc)),
            App.NewCommand("nobusy"),
            App.NewCommand("do","i gem"),
            App.NewCommand("nobusy"),
            App.NewCommand("function", App.Quest.CombineGem.Filter),
            App.NewCommand("state", "core.state.quest.combinegem.combinegem"),
            App.NewCommand("function", App.Quest.CombineGem.Check),
        ]).Push()
        App.Next()

    }
    App.RegisterState(new (Include("core/state/quest/combinegem/combinegem.js"))())
})(App)