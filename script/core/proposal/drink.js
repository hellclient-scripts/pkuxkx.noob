(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Drink= function(){
        proposal.call(this,"drink")
        this.Submit=function(){
            return App.GetItemNumber(App.API.GetItem(App.GetParam("drink")).Name,true)<App.GetNumberParam("drink_min")
        }
        this.Execute=function(){
            App.Produce(App.GetParam("drink"),App.GetNumberParam("drink_max"))
        }
    }
    App.RegisterProposal(new Drink())
})(App)