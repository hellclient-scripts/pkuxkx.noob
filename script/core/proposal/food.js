(function (app) {
    let proposal=Include("core/proposal/proposal.js")
    let Food= function(){
        proposal.call(this,"food")
        this.Submit=function(){
            return app.GetItemNumber(App.API.GetItem(app.GetParam("food")).Name,true)<app.GetNumberParam("food_min")
        }
        this.Execute=function(){
            app.Produce(app.GetParam("food"))
        }
    }
    app.RegisterProposal(new Food())
})(App)