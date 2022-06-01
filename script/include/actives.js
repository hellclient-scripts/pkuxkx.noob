(function(App){
    let Actives=function(actives,final){
        this.Actives=actives
        if (this.Actives==null){
            this.Actives=[]
        }
        this.Final=final
    }
    Actives.prototype.Start=function(){
        let a=App.Automaton.Push(["core.state.actives.ready"],this.Final)
        a.WithData("Actives",this.Actives)
        App.Ready()
    }
    return Actives
}
)(App)