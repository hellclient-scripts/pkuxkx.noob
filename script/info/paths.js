(function (app) {
    let pathre=a=/^(\[(.+)\]){0,1}(.*)$/
    let parsepath=function(fr,to,str){
        let result=str.match(pathre)
        if (result==null){
            world.Note("无效的路径"+str)
            return null
        }
        let path = Mapper.newpath()
        path.from=fr
        path.to=to
        path.command=result[3]
        path.delay = result[3].split(";").length
        let pathtags=[]
        let pathexcludetags=[]
        if (result[2]){
            let tags=result[2].split(",")

                tags.forEach(function(tag){

                    if (tag.length>0){

                        if (tag[0]=="!"){
                            if (tag.length>1){
                                pathexcludetags.push(tag.substr(1))
                            }
                            return
                        }
                        pathtags.push(tag)
                    }
                })
        }
        path.tags=pathtags
        path.excludetags=pathexcludetags
        return path
    }
    app.Info.Paths = [
        "yzgc|yzqz|n;w|e;s",
        "yzgc|yzdp|s;e|w;n",
        "yzgc|yztj|e;e;s|n;w;w",
        "yzgc|yzzxl|n;n;e|w;s;s",
        "yzgc|yzcg|s;s;w|e;n;n",
        "yzgc|yzyp|e;e;n|s;w;w",
        "yzgc|yzsy|e;e;n|s;w;w",
        "yzgc|yzkd|n;e|w;s",
        "yztj|yzdtpns|s|n",
        "yzgc|qfkm|n;n;n;n;n;n;n;n;n;w|e;s;s;s;s;s;s;s;s;s",
        "yzgc|xyzhq|w;w;w;w;nw;w;w;w;w;w;n|s;e;e;e;e;e;se;e;e;e;e",
        "xyzhq|xcc|n;n;n;n;n|s;s;s;s;s",
        "xcc|nyc|sw;sw;w;s;sw;sw|ne;ne;n;e;ne;ne",
        "nyc|xydp|sw;s;s;s;s;s;s;w;w;n|s;e;e;n;n;n;n;n;n;bo xiaolu&&ne",
        "xydp|jz|s;e;e;s;s;s;s;s;s;s;s;s;s;s|n;n;n;n;n;n;n;n;n;n;n;w;w;n",
        "xcc|rzc|nw;nw|se;se",
        "qfkm|sms|e;e;ne;eu;enter|out;wd;sw;w;w",
        "qfkm|sjy|e;n;n;n;n;ne;e;ne;n;n;nu;nu;nu;eu|wd;sd;sd;sd;s;s;sw;w;sw;s;s;s;s;w",
        "nyc|lygc|n;n;n;n;n;n;n|s;s;s;s;s;s;s",
        "lygc|cakd|w;w;w;wu;w;w;w;w;w;nw;w;w;w;w;s;s;s;s;w|e;n;n;n;n;e;e;e;e;se;e;e;e;e;e;ed;e;e;e",
        "cakd|cayp|e;s;s;w;w;n;n;w|e;s;s;e;e;n;n;w",
        "cayp|hz|e;n;n;n;w;w;w;w;sw;su;sd;se|nw;nu;nd;ne;e;e;e;e;s;s;s;w",
        "hz|cdkd|su;.sw;.se;.su;sd;s;s;e|w;n;n;nu;nd;.nw;.ne;.nd",
        "cdkd|yyl|w;s;s;se;se;e;e;ne;.ne;.nw;.nw;.ne;ed;e;n|s;w;wu;sw;.se;.se;.sw;.sw;w;w;nw;nw;n;n;e",
        "xyzhq|xcz|s;s;s;s;sd;se|nw;nu;n;n;n;n",
        "xcz|xyl|[rich]s;ask shao gong about 过江&&enter;#sail;se;se;s|[rich]n;nw;nw;ask shao gong about 过江&&enter;#sail;n",
        "xyl|jzkd|sw;sw;nw|se;ne;ne",
        "yyl|jzkd|e;e;e;e;e;e;ed;se;ed;e;ne;ne;ne;ne;ne;nw|se;sw;sw;sw;sw;sw;w;wu;nw;wu;w;w;w;w;w;w",
        "yzgc|sdnb|enter shudong|out",
        "sdnb|sdx|say 天堂有路你不走呀&&d|u",
    ]
    app.RegisterCallback("info.paths.loadpaths", function () {
        world.Note("加载路径")
        Mapper.reset()
        for (var key in app.Info.Rooms) {
            Mapper.clearroom(key)
        }
        for (var key in app.Info.Paths) {
            let data = app.Info.Paths[key].split("|")
            let from = data[0]
            let to = data[1]
            let topath = parsepath(from,to,data[2])
            if (topath){
                Mapper.addpath(from, topath)
            }
            if (data.length > 3 ) {
                let frompath = parsepath(to,from,data[3])
                if (frompath){
                    Mapper.addpath(to, frompath)
                }
            }
        }

    })
    app.RegisterAPI("GetPath", function (fr, tolist) {
        var data = Mapper.getpath(fr, 1, tolist)
        if (!data) {
            return null
        }
        let path = new app.Path()
        let commands = []
        var result = {
            Delay: 0,
            Path: path,
            Command: ""
        }
        data.forEach(function (step) {
            path.PushCommands(step.command.split(";"), step.to)
            result.Delay = result.Delay + (step.delay ? step.delay : 1)
            commands.push(step.command)
        })
        result.Command = commands.join(";")
        return result
    })
    app.Bind("Ready", "info.paths.loadpaths")
})(App)