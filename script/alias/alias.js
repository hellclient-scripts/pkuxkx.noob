(function (app) {
    app.Data.Alias = {}
    app.AliasPushData = function (name, data) {
        app.Data.Alias[name] = data
    }
    app.AliasPopData = function (name) {
        let data = app.Data.Alias[name]
        delete (app.Data.Alias[name])
        return data
    }
    app.Load("alias/to.js")
    app.Load("alias/afterbusy.js")
    app.Load("alias/do.js")
    app.Load("alias/delay.js")

})(App)