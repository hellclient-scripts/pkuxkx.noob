(function (app) {
    app.Core.Puzzle={}
    app.Data.Puzzle={}
    app.Core.Puzzle.NewItem=function(key,value){
        return [key,value]
    }
    app.Core.Puzzle.Show=function(key,title,desc,output,items){
        app.Data.Puzzle={}
        app.Data.Puzzle.Key=key
        app.Data.Puzzle.Silence=false
        app.Data.Puzzle.Title=title
        app.Data.Puzzle.Desc=desc
        app.Data.Puzzle.Output=output
        app.Data.Puzzle.Items=items
        app.Data.Puzzle.Answer=""
        app.Raise("puzzle")
        if (app.Data.Puzzle.Silence){
            return
        }
        let vp=Userinput.newvisualprompt(title+" [ "+key+" ]",desc,output)
        vp.setmediatype("output")
        if (items&&items.length>0){
            items.forEach(item => {
                vp.append(item[0],item[1])
            });
        }
        vp.publish("App.Core.Puzzle.OnAnswer")
    }
    app.Core.Puzzle.Answer=function(answer){
        app.Data.Puzzle.Answer=answer
        app.OnStateEvent("puzzle.answer")
    }
    app.Core.Puzzle.OnAnswer=function(name,id,code,data){
        if (code==0&&data){
            app.Core.Puzzle.Answer(data)
        }else{
            app.Core.Puzzle.Answer("")
        }
    }
})(App)