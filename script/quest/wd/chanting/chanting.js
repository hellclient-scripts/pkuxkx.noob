(function(App){
    App.Quest.WD.Chanting={}
    App.Quest.WD.Chanting.Book={}
    App.Quest.WD.Chanting.CurrentPage=1
    App.Quest.WD.Chanting.OnBook=function(name, output, wildcards){
        App.Quest.WD.Chanting.Book={}
        App.Quest.WD.Chanting.Book.Label=wildcards[0]
        App.Quest.WD.Chanting.Book.Content=wildcards[1]+wildcards[2]+wildcards[3]+wildcards[4]
        App.Quest.WD.Chanting.Book.Name=wildcards[5]
        App.Quest.WD.Chanting.Book.Max=CNumber.Convert(wildcards[7])

        Dump(App.Quest.WD.Chanting.Book)
    }
})(App)