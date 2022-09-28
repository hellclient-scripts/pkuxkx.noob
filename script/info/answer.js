(function (App) {
    App.Info.Answers={}
    App.Info.LoadAnswerLines=function(lines){
        lines.forEach(function(line){
            let data=line.split("||")
            if (data.length<2){
                throw "answer ["+line+"]格式错误"
            }
            App.Info.Answers[data[0]]=data[1]
        })
    }
    App.RegisterCallback("info.presets.loadanswers", function () {
        world.Note("加载口令")
        let data=world.ReadLines("info/data/answers.txt")
        App.Info.LoadAnswerLines(data)
    })
    App.Bind("Init", "info.presets.loadanswers")

})(App)