(function(){
    let patrol=function(path){
        this.Path=path
        this.Remain=path.Clone()
        this.Step=null
    }
    patrol.prototype.NextStep=function(){
        return this.Step
    }
    patrol.prototype.Move=function(){
        if (this.Remain.Length()==0){
            this.Step=null
            return null
        }
        this.Step=this.Remain.Shift()
        return this.Step
    }
    return patrol
})() 