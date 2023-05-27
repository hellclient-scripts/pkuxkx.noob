(function (App) {
    let Action = Include("include/action.js")

    App.Core.Neili={}
    App.Core.Neili.Zhenqi=false
    App.Core.Neili.Min=0
    App.Core.Neili.NoSleep=false
    App.Core.Neili.DazuoRoom=""
    App.Core.Neili.Command=""
    App.Core.Neili.CommandMinNeiliPercent=0
    App.Core.Neili.Exec=function(){
        if (App.Core.Neili.Command){
            if (App.Core.Neili.CommandMinNeiliPercent>0){
                if((App.Data.HP["eff_neili"]*100)<(App.Data.HP["eff_neili"]*App.Core.Neili.CommandMinNeiliPercent)){
                    App.Send(App.Core.Neili.Command)
                }
            }else if(App.Core.Neili.NotEnough()){
                App.Send(App.Core.Neili.Command)
            }
        }
    }
    
    App.Core.Neili.NeedDazuo=function(){
        let min = App.Core.Neili.Min
        return ((App.Data.HP["eff_neili"] < min) && (min >= 1))
    }
    App.Core.Neili.NotEnough=function(){
        let min = App.Core.Neili.Min
        if (min > 0 && min < 1) {
            return (App.Data.HP["eff_qixue"] / App.Data.HP["qixue"]) < min || (App.Data.HP["eff_jing"] / App.Data.HP["jing"]) < min
        }
        return min > App.Data.HP["eff_neili"]
    }
    App.Core.Neili.CanDazuo=function(){
        return App.Core.Neili.Min>=1
    }
    App.Core.Neili.LoadActions = function (data) {
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
    App.Core.Neili.Load=function(){
        App.Core.Neili.DazuoRoom=App.GetSafeRoom()
        let actions=App.Core.Neili.LoadActions(world.GetVariable("neili_min"))
        for (var i = 0; i < actions.length; i++) {
            let action = actions[i]
            switch (action.Command) {
                case "":
                case "#min":
                    App.Core.Neili.Min=action.Data-0
                    if (App.Core.Neili.Min>=1){
                        Note("neili_min:设置最小内力为"+action.Data)
                    }else{
                        Note("neili_min:设置最小精神气血比例为"+action.Data)
                    }
                    break
                case "#nosleep":
                    App.Core.Neili.NoSleep=true
                    Note("neili_min:禁用睡眠")
                    break
                case "#dazuoroom":
                    App.Core.Neili.DazuoRoom=action.Data
                    if (App.Core.Neili.DazuoRoom){
                        Note("neili_min:设置打坐房间:"+App.Core.Neili.DazuoRoom)
                    }else{
                        Note("neili_min:设置随地打坐")
                    }
                    break
                case "#cmd":
                    if (action.Param){
                        App.Core.Neili.CommandMinNeiliPercent=action.Param-0
                        Note("neili_min:内力指令触发百分比为"+action.Param)
                    }
                    App.Core.Neili.Command=action.Data
                    Note("neili_min:内力指令为 "+action.Data)
                    break
                case "#zhenqi":
                    App.Core.Neili.Zhenqi=true
                    Note("neili_min:设置补满真气")
                    break 
            }
        }
    }
    App.RegisterCallback("core.neili.load", function () {
        App.Core.Neili.Load()
    })
    App.Bind("Intro", "core.neili.load")
})(App)