(function(app){
    app.Offers={}
    app.RegisterOffer=function(offer){
        if (offer.ID==""){
            throw "Task id不可为空"
        }
        app.Offers[offer.ID]=offer
      }
})(App)