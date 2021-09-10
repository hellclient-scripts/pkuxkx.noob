(function(){
    var backward=Include("include/backward.js")
    let Locate=function(depth){
        this.Depth=depth?depth:1
        this.Levels=[]
        this.Steps=[]
    }
    Locate.prototype.NextStep=function(){
        if (this.Levels.length>this.Depth || (this.Levels[this.Levels.length-1].length==0)){
            if (this.Levels.length <=1 ){
                return nil
            }
            return backward[this.Steps[this.Steps.length-1]]
        }
        return this.Levels[this.Levels.length-1][0]

    }
    Locate.prototype.Enter=function(exits){
        if (this.Levels.length){
            if (this.Levels.length>this.Depth || (this.Levels[this.Levels.length-1].length==0)){
                this.Levels.pop()
                this.Steps.pop()
                return this.NextStep()
            }
        }
        let step
        if (this.Levels.length){
            step=this.Levels[this.Levels.length-1].shift()
            this.Steps.push(step)
        }
        let level=[]
        exits.forEach(function(data){
            if (backward[data] && backward[data]!=step){
                level.push(data)
            }
        })
        this.Levels.push(level)
        return this.NextStep()
    }
    return Locate
})()