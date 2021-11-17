(function(app){
    app.Produce=function(id){
        let item=App.API.GetItem(id)
        if (item==null){
            throw "item "+id +" not found"
        }
        let a=app.Automaton.Push("checkitem")
        a.WithTransitions([item.Type])
        a.WithData("Item",item)
        app.ChangeState("ready")
    }
    app.RegisterState(new (Include("core/state/produce/goods.js"))())
})(App)