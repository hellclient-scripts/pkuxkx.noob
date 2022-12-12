(function(App){
    let _drivepath=Include("include/drivepath.js")
    let Vehicle=function(){
        this.Tags=null
        this.MultiStep=false
        this.ID=""
        this.RetryInterval=0.5
        this.Fly=false
        this.Sender=function(cmd){
            App.SendToMoveBuff(cmd)
        }
        this.OnWrongway=null
    }
    Vehicle.prototype.Send=function(cmd){
        this.Sender(cmd)
    }
    Vehicle.prototype.ConvertDrivePath=function(cmd,path){
        let p=_drivepath[path]
        if (!p){
            throw "无效的drivepath"+path
        }
        p=p.replace("%1",cmd)
        return p
    }
    return Vehicle
})(App)