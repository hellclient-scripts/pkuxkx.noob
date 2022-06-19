(function (App) {
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wdj.zhengli.zhengli"
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "quest.wdj.shelf":
            let lines=JSON.parse(DumpOutput(4,1))
            let books=[]
            for (var i=0;i<lines[0].Words.length;i++){
                books[i]={
                    Name:(lines[0].Words[i].Text+lines[1].Words[i].Text+lines[2].Words[i].Text+lines[3].Words[i].Text).trim(),
                    Color:lines[0].Words[i].Background
                }
            }
            books.sort(function(a,b){
                return a.Color<b.Color?-1:1
            })
            books.forEach(function(book,index){
                App.Send("zhengli "+book.Name+" to "+(index+1))
            })
            App.Next()
            break
        }

    }
    State.prototype.Enter=function(context,oldstatue){
        App.Send("l shelf")
    }
    State.prototype.Leave=function(context,oldstatue){
    }
    return State
})(App)