(function(App){
    App.Quest.WD.Chanting={}
    App.Quest.WD.Chanting.Quest={}
    App.Quest.WD.Chanting.Book={}
    App.Quest.WD.Chanting.CurrentPage=1
    let filter=/[\s\n\=]/g
    App.Quest.WD.Chanting.Start=function(location,book,label,section){
        App.Raise("quest.set","武当新人诵经《"+book+"》 "+label+"["+section+"]"+"@"+location)
        App.Quest.WD.Chanting.NewQuest(location,book,label,section)
        App.Push(["core.state.quest.wd.chanting.chanting"])
        App.Next()
    }
    App.Quest.WD.Chanting.OnBookFail=function(name, output, wildcards){
        App.RaiseStateEvent("quest.wd.chanting.readfail")
    }

    App.Quest.WD.Chanting.OnBook=function(name, output, wildcards){
        App.Quest.WD.Chanting.Book={}
        App.Quest.WD.Chanting.Book.Label=wildcards[0]
        App.Quest.WD.Chanting.Book.Section=(wildcards[1]-0)
        App.Quest.WD.Chanting.Book.Content=wildcards[2]
        App.Quest.WD.Chanting.Book.Name=wildcards[3]
        App.Quest.WD.Chanting.Book.Max=CNumber.Convert(wildcards[6])
        App.RaiseStateEvent("quest.wd.chanting.onbook")
    }
    App.Quest.WD.Chanting.OnBook2=function(name, output, wildcards){
        App.Quest.WD.Chanting.Book={}
        App.Quest.WD.Chanting.Book.Label=""
        App.Quest.WD.Chanting.Book.Section=(CNumber.Convert(wildcards[1]))
        App.Quest.WD.Chanting.Book.Content=wildcards[2]
        App.Quest.WD.Chanting.Book.Name=wildcards[3]
        App.Quest.WD.Chanting.Book.Max=CNumber.Convert(wildcards[6])
        App.RaiseStateEvent("quest.wd.chanting.onbook")
    }
    App.Quest.WD.Chanting.PageDown=function(offset){
        App.Quest.WD.Chanting.ChangePage(App.Quest.WD.Chanting.CurrentPage+offset)
    }
    App.Quest.WD.Chanting.ChangePage=function(page){
        App.Quest.WD.Chanting.CurrentPage=page
        App.Send("page "+page)
    }
    App.Quest.WD.Chanting.ChantingCurrent=function(){
        App.Send("chanting "+App.Quest.WD.Chanting.CurrentPage+ " "+App.Quest.WD.Chanting.FilterContent())
    }
    App.Quest.WD.Chanting.FilterContent=function(){
        let content=  App.Quest.WD.Chanting.Book.Content?App.Quest.WD.Chanting.Book.Content:""
        return content.replace(filter,"")
    }
    App.Quest.WD.Chanting.NewQuest=function(location,book,label,section){
        App.Quest.WD.Chanting.Quest={
            Location:location,
            Book:book,
            Label:label,
            Section:section,
        }   
        App.Quest.WD.Chanting.CurrentPage=1
    }
    App.RegisterState(new (Include("core/state/quest/wd/chanting/chanting.js"))())
    App.RegisterState(new (Include("core/state/quest/wd/chanting/read.js"))())

})(App)