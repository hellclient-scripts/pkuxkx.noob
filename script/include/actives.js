(function(app){
    let Active=function(actives,final){
        this.Actives=actives
        if (this.Actives==null){
            this.Actives=[]
        }
        this.Final=final
    }
    Active.prototype.Start=function(){
        let a=app.Automaton.Push(["core.state.actives.ready"],this.Final)
        a.WithData("Actives",this.Actives)
        app.Ready()
    }
}
)(App)