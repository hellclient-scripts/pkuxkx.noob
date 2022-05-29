(function(app){
    let Actives=function(actives,final){
        this.Actives=actives
        if (this.Actives==null){
            this.Actives=[]
        }
        this.Final=final
    }
    Actives.prototype.Start=function(){
        let a=app.Automaton.Push(["core.state.actives.ready"],this.Final)
        a.WithData("Actives",this.Actives)
        app.Ready()
    }
    return Actives
}
)(App)