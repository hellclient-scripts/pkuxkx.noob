(function (App) {
    App.Core.Puzzle={}
    App.Data.Puzzle={}
    App.Core.Puzzle.NewItem=function(key,value){
        return [key,value]
    }
    App.Core.Puzzle.Show=function(key,title,desc,output,items){
        App.Data.Puzzle={}
        App.Data.Puzzle.Key=key
        App.Data.Puzzle.Silence=false
        App.Data.Puzzle.Title=title
        App.Data.Puzzle.Desc=desc
        App.Data.Puzzle.Output=output
        App.Data.Puzzle.Items=items
        App.Data.Puzzle.Answer=""
        App.Raise("puzzle")
        if (App.Data.Puzzle.Silence){
            Note("静默模式")
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
    App.Core.Puzzle.ShowText=function(key,title,desc,text,items){
        App.Data.Puzzle={}
        App.Data.Puzzle.Key=key
        App.Data.Puzzle.Silence=false
        App.Data.Puzzle.Title=title
        App.Data.Puzzle.Desc=desc
        App.Data.Puzzle.Text=text
        App.Data.Puzzle.Items=items
        App.Data.Puzzle.Answer=""
        App.Raise("puzzletext")
        if (App.Data.Puzzle.Silence){
            Note("静默模式")
            return
        }
        let vp=Userinput.newvisualprompt(title+" [ "+key+" ]",desc,text)
        vp.setmediatype("text")
        if (items&&items.length>0){
            items.forEach(item => {
                vp.append(item[0],item[1])
            });
        }
        vp.publish("App.Core.Puzzle.OnAnswer")
    }
    App.Core.Puzzle.Answer=function(answer){
        App.Data.Puzzle.Answer=answer
        App.RaiseStateEvent("puzzle.answer")
    }
    App.Core.Puzzle.OnAnswer=function(name,id,code,data){
        if (code==0&&data){
            App.Core.Puzzle.Answer(data)
        }else{
            App.Core.Puzzle.Answer("")
        }
    }
})(App)