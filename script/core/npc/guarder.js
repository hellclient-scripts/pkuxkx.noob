(function (app) {
    let Npc = Include("core/npc/npc.js")
    let Guarder = function () {
        Npc.call(this)
        this.Type="guarder"
    }
    Guarder.prototype = Object.create(Npc.prototype)
    return Guarder
})(App)