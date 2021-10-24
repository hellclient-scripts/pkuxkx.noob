(function (app) {
    let proposal=Include("core/proposal/proposal.js")
    let Drink= function(){
        proposal.call(this,"drink")
        this.Submit=function(){
            
            return app.GetItemNumber(App.API.GetItem(app.GetParam("drink")).Name,true)<app.GetNumberParam("drink_min")
        }
        this.OnExecute=function(){
            app.Produce(app.GetParam("drink"),this.OnFinish)
        }
    }
    app.RegisterProposal(new Drink())
})(App)