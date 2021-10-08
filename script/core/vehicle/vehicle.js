(function(app){
    let _drivepath=Include("include/drivepath.js")
    let Vehicle=function(){
        this.TagDrive=false
        this.MultiStep=false
        this.ID=""
        this.RetryInterval=0.5
        this.Fly=false
        this.Sender=function(cmd){
            app.Send(cmd)
        }
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