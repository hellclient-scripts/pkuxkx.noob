(function (App) {
    App.Core.InitCmd="unset table_pattern;l;set brief 3;i undeaded;lookin he;i2;score;cha;special;alias;set custom_hp 1;set no_autosave 1;set area_detail 1;yield no;set hpbrief long,report;tune gmcp Status off;hpbrief;hp;tune gmcp Status on;tune gmcp Move on;tune gmcp Combat on;tune gmcp BUFF on;time;biguan -r"
    App.Core.Inited=false
    App.Core.Init=function(){
        App.Core.Buff.CheckAll()
        App.Send(App.Core.InitCmd)
        App.Core.Combat.Init()
        App.Response("core","init")
    }
    App.RegisterCallback("app.core.init",function(){
        App.Core.Inited=true
        Note("初始化成功")
        App.RaiseStateEvent("inited")
    })
    App.Bind("Response.core.init","app.core.init")

})(App)