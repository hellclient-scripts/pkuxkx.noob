(function(){
    var Backward=Include("include/backward.js")
    var Step=Include("include/step.js")
    let DFS=function(depth,backward){
        //最大步数
        this.Depth=depth?depth:1
        this.Backward=backward?backward:Backward
   }
   DFS.prototype.GetBackward=function(cmd){
       return this.Backward[cmd]?this.Backward[cmd]:null
   }
   DFS.prototype.New=function(){
       return new Next(this,null,null)
   }
   let Next=function(DFS,level,command){
    this.Level=level    
    this.DFS=DFS
    this.Command=command
   }
   Next.prototype.Arrive=function(exits){
    let filtered=[]
    exits.forEach(exit => {
        let back=this.DFS.GetBackward(exit)
        if (back && back!=this.Command){
            filtered.push(exit)
        }
    });
    return new Level(this.DFS,this.Level,filtered,this.DFS.GetBackward(this.Command))
   }
   let Back=function(DFS,level,command){
    this.Level=level
    this.DFS=DFS
    this.Command=command
   }
   Back.prototype.Arrive=function(exits){
        return this.Level
    }
   let Level=function(DFS,parent,exits,backward){
        this.DFS=DFS
        this.Parent=parent
        this.Exits=exits
        this.Index=parent?parent.Index+1:1
        this.Backward=backward
   }
   Level.prototype.Next=function(){
        if (!this.Exits.length||this.Index>=this.DFS.Depth){
            return this.Back()
        }
        let newexits=[...this.Exits]
        let command=newexits.shift()
        let clone=new Level(this.DFS,this.Parent,newexits,this.Backward)
        return new Next(this.DFS,clone,command)
   }
   Level.prototype.Back=function(){
    return new Back(this.DFS,this.Parent,this.Backward)
   }
   Level.prototype.Concat=function(){
        if (this.Parent){
            let result=this.Parent.Concat()
            result.push(this.DFS.GetBackward(this.Backward))
            return result
        }
        return []
   }
   Level.prototype.ConcatBackward=function(){
    if (this.Parent){
        let result=this.Parent.ConcatBackward()
        result.unshift(this.Backward)
        return result
    }
    return []
}
   return DFS
})()