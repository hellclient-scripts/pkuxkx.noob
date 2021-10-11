(function (app) {
    let Npc = Include("core/npc/npc.js")
    let Patrolman = function () {
        Npc.call(this)
        this.Type="patrolman"
    }
    Patrolman.prototype = Object.create(Npc.prototype)
    return Patrolman
})(App)