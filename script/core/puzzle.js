(function (app) {
    app.Core.Puzzle={}
    app.Data.Puzzle={}
    app.Core.Puzzle.NewItem=function(key,value){
        return [key,value]
    }
    app.Core.Puzzle.Show=function(title,desc,output,items){
        app.Data.Puzzle.Title=title
        app.Data.Puzzle.Desc=desc
        app.Data.Puzzle.Output=output
        app.Data.Puzzle.Items=items
        app.Data.Puzzle.Answer=""
        let vp=Userinput.newvisualprompt(title,desc,output)
        vp.setmediatype("output")
        if (items&&items.length>0){
            items.forEach(item => {
                vp.append(item[0],item[1])
            });
        }
        vp.publish("App.Core.Puzzle.Answer")
    }
    app.Core.Puzzle.Answer=function(name,id,code,data){
        if (code==0&&data){
            app.Data.Puzzle.Answer=data
        }else{
            app.Data.Puzzle.Answer=""
        }
        app.OnStateEvent("puzzle.answer")
    }
})(App)