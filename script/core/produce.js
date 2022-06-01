(function(App){
    App.Produce=function(id){
        let item=App.API.GetItem(id)
        if (item==null){
            throw "item "+id +" not found"
        }
        let a=App.Automaton.Push([],"checkitem")
        a.WithTransitions([item.Type])
        a.WithData("Item",item)
        App.ChangeState("ready")
    }
    App.RegisterState(new (Include("core/state/produce/goods.js"))())
})(App)