(function (App) {
    let ipath = Include("include/path.js")
    App.Info.UserPaths = []
    App.Info.BuiltinPaths = []
    let homere = /(\S+)(\s+(.+)){0,1}/
    App.Info.LoadHomePath = function () {
        let home = App.GetParamHome().trim()
        let homeloc = App.Info.DefaultHomeLocation
        if (home) {
            let data = home.match(homere)
            if (data) {
                let path
                let homeid = data[1]
                if (data[3]) {
                    homeloc = data[1]
                    homeid = data[3]
                }

                path = [homeloc, App.Info.RoomHome, "", "enter " + homeid, "out"]
                App.Info.BuiltinPaths = [path.join("||")].concat(App.Info.BuiltinPaths)
            }
        }
        let jxj = [homeloc, "jxj", "", "enter jianxinju", "#leaveid", "50", "50"]
        App.Data.HomeLoc = homeloc
        App.Info.BuiltinPaths = [jxj.join("||")].concat(App.Info.BuiltinPaths)
    }
    App.Info.LoadBangPaiPath = function () {
        let loc = App.GetParamBangpai().trim()
        if (loc) {
            path = [loc, "bangpaimen", "", "huibang", "out"]
            Note("发现帮派，位于" + loc)
            App.Info.BuiltinRooms = [[loc, "bangpai-entry"].join("||")].concat(App.Info.BuiltinRooms)
            App.Info.BuiltinPaths = [path.join("||")].concat(App.Info.BuiltinPaths)
        }
    }
    App.RegisterCallback("info.paths.loadpaths", function () {
        App.Info.LoadHomePath()
        App.Info.LoadBangPaiPath()
        App.Info.LoadBuiltinPaths()
        if (world.HasHomeFile("data/paths.txt")) {
            App.Info.UserPaths = world.ReadHomeLines("data/paths.txt")
        }
    })
    App.Info.LoadBuiltinPaths = function () {
        App.Info.BuiltinPaths = App.Info.BuiltinPaths.concat(world.ReadLines("info/data/paths.txt"))
    }
    App.RegisterAPI("ConvertPath", function (path, target) {
        let p = new ipath()
        p.PushCommands(path.split(";"), target ? target : "")
        return p
    })
    App.RegisterAPI("SaveUserPaths", function () {
        let data = App.Info.UserPaths.join("\n")
        MakeHomeFolder("data/")
        world.WriteHomeFile("data/paths.txt", data)
    })
    App.Info.CombinePath = function (data) {
        let path = new ipath()
        let commands = []
        var result = {
            Delay: 0,
            From: null,
            To: null,
            Path: path,
            Command: ""
        }
        data.forEach(function (step) {
            if (result.From === null) {
                result.From = step.from
            }
            result.To = step.to
            path.PushCommands(step.command.split(";"), step.to)
            result.Delay = result.Delay + (step.delay ? step.delay : 1)
            commands.push(step.command)
        })
        result.Command = commands.join(";")
        return result
    }
    App.RegisterAPI("GetPath", function (fr, tolist, option) {
        Mapper.flashtags()
        App.Raise("PathInit")
        var data = Mapper.getpath(fr, 1, tolist, option)
        if (!data) {
            return null
        }
        return App.Info.CombinePath(data)
    })
    App.Info.RebuildPath = function () {
        var lines = world.ReadLines("info/data/paths.txt");
        var output = []
        let sep = /\|\|/
        lines.forEach(function (line) {
            if (line == "" || line.slice(0, 2) == "//") {
                output.push(line)
                return
            }
            let data = line.split(sep)
            if (data.length < 2) {
                output.push(line)
                return
            }
            let from = data[0]
            let to = data[1]
            let tags = data[2]
            if (tags == null) {
                tags = ""
            };
            Mapper.flashtags()
            Mapper.settag(tags, true)
            let frompath = Mapper.getpath(from, 1, [to])
            data[3] = frompath == null ? "" : App.Info.CombinePath(frompath).Command;
            Mapper.flashtags()
            Mapper.settag(tags, true)
            let topath = Mapper.getpath(to, 1, [from])
            data[4] = topath == null ? "" : App.Info.CombinePath(topath).Command;
            data[5] = frompath == null ? "" : App.Info.CombinePath(frompath).Delay;
            if (topath != null || frompath != null) {
                output.push(data.join("||"));
            }
        })
        var result=output.join("\n")
        print(result);
        MakeHomeFolder("")
        WriteHomeFile("path.rebuild.txt",result)

    }
    App.Bind("Init", "info.paths.loadpaths")
})(App)