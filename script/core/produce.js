(function(App){
    App.Produce=function(id,amount){
        let item=App.API.GetItem(id)
        if (item==null){
            throw "item "+id +" not found"
        }
        let a=App.Automaton.Push([],"checkitem")
        a.WithTransitions([item.Type])
        a.WithData("Item",item)
        a.WithData("Amount",amount?(amount-0):1)
        App.Next()
    }
    App.RegisterState(new (Include("core/state/produce/goods.js"))())
    App.RegisterState(new (Include("core/state/produce/goodscheck.js"))())
})(App)