(function(App){
    App.Core.Time={}
    //客户端时间与服务器时间的偏差，单位为秒
    App.Core.Time.OffsetSeconds=null
    //启动时间序号，以10分钟为单位
    App.Core.Time.BootIndex=null
    const BootIndexTolerance=1
    App.Core.Time.OnTime=function(name, output, wildcards){
        let date=new Date(wildcards["year"]-0,wildcards["month"]-1,wildcards["day"]-0,wildcards["hour"]-0,wildcards["minute"]-0,wildcards["second"]-0)
        let uptime=0
        if (wildcards["lastday"]){
            uptime=uptime+CNumber.Convert(wildcards["lastday"])*24*3600*1000
        }
        if (wildcards["lasthour"]){
            uptime=uptime+CNumber.Convert(wildcards["lasthour"])*3600*1000
        }
        if (wildcards["lastminute"]){
            uptime=uptime+CNumber.Convert(wildcards["lastminute"])*60*1000
        }
        
        let now=new Date()
        App.Core.Time.OffsetSeconds=Math.floor((now.getTime()-date.getTime())/1000)
        let boottime=new Date(Date.now()-uptime)
        App.Core.Time.BootIndex=Math.floor(boottime.getTime()/(10*60*1000))
    }
    App.Core.Time.IsSameBoot=function(t){
        if (App.Core.Time.BootIndex==null || !t){
            return false
        }
        let offset=t-App.Core.Time.BootIndex
        if (offset<0){
            offset=-offset
        }
        return offset<=BootIndexTolerance
    }
}(App))