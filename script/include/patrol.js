(function(){
    let patrol=function(path){
        this.Path=path
        this.Remain=path.Clone()
        this.Current=null
    }
    patrol.prototype.Move=function(){
        if (this.Remain.Length()==0){
            this.Current=null
            return null
        }
        this.Current=this.Remain.Shift()
        return this.Current
    }
    return patrol
})() 