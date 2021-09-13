(function(){
    let Step=Include("include/step.js")
    let Walk=function(path){
        this.Moving=[]
        this.Path=path
    }
    Walk.prototype.Current=function(){
        return this.Path.First()
    }
    Walk.prototype.Move=function(){
        let step=this.Path.Shift()
        if (step){
            this.Moving.push(step)
        }
        return step
    }
    Walk.prototype.Arrive=function(){
        return this.Moving.shift()
    }
    return Walk
})()