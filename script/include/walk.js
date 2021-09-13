(function(){
    let Step=Include("include/step.js")
    let Walk=function(){
        this.Moving=[]
        this.Path=[]
    }
    Walk.prototype.Current=function(){
        if (this.Steps.length==0){
            return null
        }
        return this.Steps[0]
    }
    Walk.prototype.Move=function(){
        let step=this.Steps.shift()
        if (step){
            this.Moving.push(step)
        }
        return this.Current()
    }
    Walk.prototype.Arrive=function(){
        return this.Moving.shift()
    }
    return Walk
})