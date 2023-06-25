(function(App){
    let check=Include("core/check/check.js")
    App.Core.Wuxue={}
    App.Data.Wuxue={
        XiuxingDian:0,
    }
    App.Core.Wuxue.OnXiuxingDian=function(name, output, wildcards){
        App.Data.Wuxue.XiuxingDian=wildcards[0]-0
    }
    App.Bind("Check","core.wuxue.biguan")
    let checkBiguan=(new check("biguan")).WithLevel(App.CheckLevelBrief).WithCommand("biguan -r").WithIntervalParam("checkbiguaninterval").WithLastID("LastBiguanR")
    App.RegisterCallback("core.wuxue.biguan",checkBiguan.Callback())
    App.Core.Wuxue.Check=checkBiguan
})(App)