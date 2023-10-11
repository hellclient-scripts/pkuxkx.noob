(function(App){
    App.Help.ViewQuests=function(){
        let data=""
        questids=Object.keys(App.Core.Quest.Quests)
        for (var i=0;i<questids.length;i++){
            let quest=App.Core.Quest.Quests[questids[i]]
            data=data+"#"+quest.ID+" "+quest.Desc+"\n\n"
            data=data+quest.Intro+"\n\n"
            data=data+quest.MarkdownHelp+"\n\n"
        }
        Note(data)
    }
})(App)