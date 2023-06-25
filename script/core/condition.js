
(function(App){
    App.Core.Condition={}
    App.Core.Condition.Conditions={}
    App.Core.Condition.Register=function(condition){
        let id=condition.ID
        if (!id){
            throw "Condition id不可为空"
        }
        App.Core.Condition.Conditions[id]=condition
    }
    App.Core.Condition.Match=function(str){
        if (!str){
            str=""
        }
        let cmds=str.split(",")

        for (var i=0;i<cmds.length;i++){
            let data=SplitN(cmds[i]," ",2)
            if (data.length==1){
                data[1]=""
            }
            var exclude=false
            data[1]=data[1].trim()
            if (data[0].slice(0,1)=="!"){
                data[0]=data[0].slice(1)
                exclude=true
            }
            let c=App.Core.Condition.Conditions[data[0]]
            if (!c){
                throw "Condition id["+data[0]+"]找不到"
            }
            if (c.Match(data[1])==exclude){
                return false
            }
        }
        return true
    }
    App.Core.Condition.MatchCmd=function(str){
        if (str.indexOf(">>")==-1){
            return str
        }
        let data=SplitN(str,">>",2)
        if (data.length==1){
            return ""
        }
        return App.Core.Condition.Match(data[0])?data[1]:""
    }
    App.Core.Condition.Register(new (Include("core/condition/expmax.js"))())
    App.Core.Condition.Register(new (Include("core/condition/before.js"))())
    App.Core.Condition.Register(new (Include("core/condition/after.js"))())
    App.Core.Condition.Register(new (Include("core/condition/fullmeok.js"))())
    App.Core.Condition.Register(new (Include("core/condition/here.js"))())
    App.Core.Condition.Register(new (Include("core/condition/gu.js"))())
    App.Core.Condition.Register(new (Include("core/condition/turbo.js"))())
    App.Core.Condition.Register(new (Include("core/condition/shaqi.js"))())
    App.Core.Condition.Register(new (Include("core/condition/xiuxingdian.js"))())

})(App)