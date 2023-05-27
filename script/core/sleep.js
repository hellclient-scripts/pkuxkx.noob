(function(App){
    App.Core.Sleep={}
    App.Core.Sleep.Last=0
    App.Core.Sleep.CanSleep=function(){
        if (App.Core.Neili.NoSleep){
            return false
        }
        return After(App.Core.Sleep.Last,App.GetNumberParam('sleepdelay'))
    }
    App.Core.Sleep.OnWake=function(name, output, wildcards){
        App.Core.Sleep.Last=Now()
        App.Data.HP['eff_neili']=Math.floor(App.Data.HP['neili']*0.6)
        App.Data.HP['eff_qixue']=App.Data.HP['qixue']
        //有时候昏迷有Bug
        App.Core.Death.OnConscious()
        App.RaiseStateEvent("core.sleep.wake")
    }
    App.Core.Sleep.OnLater=function(name, output, wildcards){
        App.Core.Sleep.Last=Now()
        App.RaiseStateEvent("core.sleep.later")        
    }
    App.Core.Sleep.OnFail=function(name, output, wildcards){
        App.RaiseStateEvent("core.sleep.fail")        
    }
    App.RegisterState(new (Include("core/state/sleep/sleep.js"))())

}(App))