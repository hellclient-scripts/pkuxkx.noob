(function (App) {
    let proposal=Include("core/proposal/proposal.js")
    let Drink= function(){
        proposal.call(this,"drink")
        this.Submit=function(){
            let drink=App.GetNumberParam("drink_min")
            if (drink>App.GetNumberParam("drink_max")){
                drink=App.GetNumberParam("drink_max")
            }
            return App.GetItemNumber(App.API.GetItem(App.GetParam("drink")).Name,true)<drink
        }
        this.Execute=function(){
            App.Produce(App.GetParam("drink"),App.GetNumberParam("drink_max"))
        }
    }
    App.RegisterProposal(new Drink())
})(App)