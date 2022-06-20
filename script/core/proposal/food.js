(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Food= function(){
        proposal.call(this,"food")
        this.Submit=function(){
            return App.GetItemNumber(App.API.GetItem(App.GetParam("food")).Name,true)<App.GetNumberParam("food_min")
        }
        this.Execute=function(){
            App.Produce(App.GetParam("food"),App.GetNumberParam("food_max"))
        }
    }
    App.RegisterProposal(new Food())
})(App)