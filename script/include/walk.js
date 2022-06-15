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
    Walk.prototype.NextStep=function(){
        if (this.Moving.length==0){
            return null
        }
        return this.Moving[0]
    }
    Walk.prototype.Arrive=function(move){
        let current=move.Current.Command
        if (current){
            let maze=App.Core.Maze.LoadMaze(current)
            if (maze) {
                if(!maze.IsEscaped(move)){
                    maze.Explore(move)
                    return
                }else{
                    maze.Leave()
                }
            }
            App.Data.Room.ID=move.Current.Target
        }
        return this.Moving.shift()
    }
    return Walk
})()