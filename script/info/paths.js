(function(app){
    app.Info.Paths={
        "yzqz":"yzgc|n;w|e;s",
        "yzdp":"yzgc|s;e|w;n",
        "yztj":"yzgc|e;e;s|n;w;w",
        "yzzxl":"yzgc|n;n;e|w;s;s",
        "yzzxl":"yzgc|s;s;w|e;n;n",
        "yzyp":"yzgc|e;e;n|s;w;w",
        "yzsy":"yzgc|e;e;n|s;w;w",
        "yzkd":"yzgc|n;e|w;s",
        "yzdtpns":"yztj|s|n",
    }
    app.RegisterCallback("info.paths.loadpaths",function(){
        world.Note("加载路径")
        Mapper.reset()
        for (var key in app.Info.Rooms){
            Mapper.clearroom(key)
        }
        for (var key in app.Info.Paths){
            var to=key
            var data=app.Info.Paths[key].split("|")
            var from=data[0]
            var topath=Mapper.newpath()
            topath.from=from
            topath.to=to
            topath.command=data[1]
            topath.delay=data[1].split(";").length
            Mapper.addpath(from,topath)
            var frompath=Mapper.newpath()
            frompath.from=to
            frompath.to=from
            frompath.command=data[2]
            frompath.delay=data[2].split(";").length
            Mapper.addpath(to,frompath)
        }
        
    })
    app.RegisterAPI("GetPath",function(fr,tolist){
        var data=Mapper.getpath(fr,1,tolist)
        if (!data){
            return null
        }
        let path=new app.Path()
        let commands=[]
        var result={
            Delay:0,
            Path:path,
            Command:""
        }        
        data.forEach(function(step){
            path.PushCommands(step.command.split(";"),step.to)
            result.Delay=result.Delay+ (step.delay?step.delay:1)
            commands.push(step.command)  
        })
        result.Command=commands.join(";")
        return result
    })
    app.Bind("ready","info.paths.loadpaths")
})(App)