(function(app){
    let locate=Include("include/locate.js")
    let Move=Include("core/move/move.js")
    let Locate=function(mode,target,onFinish,options){
        Move.call(this,mode,target,onFinish,options)
        this.OnStart=function(){
            this.Context=new locate(this.Target-0)
            App.Send("l")
        }
        this.OnStepTimeout=function(){
            world.EnableTimer("steptimeout",false)
            let step=this.Context.Skip()
            if (step){
                world.Note("移动超时，换个出口")
                this.tryExplore(step)
            }else{
                this.Stop()
                world.Note("定位失败")
                app.ExecuteCallback(this.onFail,this.Data)
            }            
        }
        this.tryExplore=function(data){
            world.EnableTimer("steptimeout",true)
            this.Current=data
            App.Send(data.Command)
        }
        this.OnRoomObjEnd=function(){
            world.EnableTimer("steptimeout",false)
            if (app.Data.Room.ID){
                world.Note("定位成功")
                if (app.Data.PendingMove!=null){
                    app.Data.Move=app.Data.PendingMove
                    app.Data.PendingMove=null
                    app.Data.Move.Start()
                    return
                }
                this.Stop()
                app.ExecuteCallback(this.onFinish,this.Data)
                return
            }
            let step=this.Context.Enter(app.Data.Room.Exits)
            if (step){
                this.tryExplore(step)
            }else{
                this.Stop()
                world.Note("定位失败")
                app.ExecuteCallback(this.onFail,this.Data)
            }
        }
    }
    return Locate;
})(App)