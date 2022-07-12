(function (App) {
    let re=/^书架上的书有点乱了，你要把它们按颜色整理\(zhengli <书名> to <位置>，比如zhengli 金瓶梅 to 2\)好。$/
    let basicstate = Include("core/state/basicstate.js")
    let State=function(){
        basicstate.call(this)
        this.ID="core.state.quest.wdj.zhengli.zhengli"
        this.Groups = this.Groups.concat(["state.line"])
        this.Lines=[]
    }
    State.prototype = Object.create(basicstate.prototype)
    State.prototype.OnEvent=function(context,event,data){
        switch(event){
        case "line":    
            if (data.match(re)==null){
                return
            }
            let lines=JSON.parse(DumpOutput(4,1))
            let books=[]
            for (var i=0;i<lines[3].Words.length;i++){
                books[i]={
                    Name:"",
                    Color:lines[3].Words[i].Background
                }
                lines.forEach(function(line){
                    if (line.Words.length==lines[3].Words.length && line.Words[i].Background==lines[3].Words[i].Background && line.Words[i].Text.length==1){
                        books[i].Name=books[i].Name+line.Words[i].Text
                    }
                })
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