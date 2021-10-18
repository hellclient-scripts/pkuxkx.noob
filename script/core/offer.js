(function (app) {
    app.Offers = {}
    app.OfferGroups = {}
    app.RegisterOffer = function (offer) {
        if (offer.ID == "") {
            throw "Offer id不可为空"
        }
        app.Offers[offer.ID] = offer
    }
    app.RegisterOfferGroup = function (groupid, offers) {
        app.Offers[groupid] = offers
    }

    let try_offers = function (offers, onfinish) {
        for (var i in offers) {
            let offer = app.Offers[offers[i]]
            if (!offer) {
                throw "要约 [" + groupid + "] 没找到"
            }
            if (offer.Evaluate()) {
                offer.Accept(onfinish)
                return true
            }
        }
        return false
    }
    let tyr_offergroup = function (group, onfinish) {
        let group = app.OfferGroups[groupid]
        if (!group) {
            throw "要约组 [" + groupid + "] 没找到"
        }
        return try_offers(group, onfinish)

    }
    let tyr_offergroups = function (groups, onfinish) {
        for (var i in groups) {
            let group=groups[i]
            if (try_offergroup(group,onfinish)){
                return true
            }
        }
        return false
    }
    app.TryOfferGroups = function (groups, onfinish, onfail) {
        if (tyr_offergroups(groups, onfinish)) {
            return true
        }
        app.ExecuteCallback(onfail)
        return false

    }
    app.TryOfferGroup = function (groupid, onfinish, onfail) {
        if (tyr_offergroup(groupid, onfinish)) {
            return true
        }
        app.ExecuteCallback(onfail)
        return false
    }
    app.TryOffers = function (offers, onfinish, onfail) {
        if (try_offers(offers, onfinish)) {
            return true
        }
        app.ExecuteCallback(onfail)
        return false
    }
})(App)