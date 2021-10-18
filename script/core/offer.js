(function (app) {
    app.Offers = {}
    app.OfferGroups = {}
    app.RegisterOffer = function (offer) {
        if (offer.ID == "") {
            throw "Offer id不可为空"
        }
        app.Offers[offer.ID] = offer
    }
    app.RegisterOfferGroup=function(groupid,offers){
        app.Offers[groupid]=offers
    }
    app.EvaluateOfferGroup = function (groupid, onfinish, onfail) {
        let group=app.OfferGroups[groupid]
        if (!group){
            throw "要约组 ["+groupid+"] 没找到"
        }
        app.EvaluateOffers(group)
    }
    app.EvaluateOffers = function (offers, onfinish, onfail) {
        for (var i in offers){
            if (offers[i].Evaluate()){
                offers[i].Accept(onfinish)
                return 
            }
        }
        app.ExecuteCallback(onfail)
    }
})(App)