(function(App){
    let Actives=function(actives,final){
        this.Actives=actives
        if (this.Actives==null){
            this.Actives=[]
        }
        this.Final=final
    }
    Actives.prototype.Push=function(){
        let a=App.Automaton.Push(["core.state.actives.ready"],this.Final)
        a.WithData("Actives",this.Actives)
    }
    Actives.prototype.Start=function(){
        this.Push()
        App.Next()
    }
    return Actives
}
)(App)