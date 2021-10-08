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
            App.Go(data.Command)
        }
        this.RetryExplore=function(){
            world.EnableTimer("steptimeout",false)
            this.tryExplore(this.Current)
        }
        this.Retry=function(){
            world.DoAfterSpecial(app.Vehicle.RetryInterval, 'App.Data.Move.RetryExplore()', 12);
        }
        this.OnRoomObjEnd=function(){
            world.EnableTimer("steptimeout",false)
            if (app.Data.Room.Name){
                let rids=Mapper.getroomid(app.Data.Room.Name)
                if (rids&& rids.length==1){
                    app.Data.Room.ID=rids[0]
                }
            }
            if (app.Data.Room.ID!==""){
                world.Note("定位成功")
                if (app.Data.PendingMove!=null){
                    app.Data.Move=app.Data.PendingMove
                    app.Data.PendingMove=null
                    app.Data.Move.Start()
                    return
                }
                this.Stop()
                app.ExecuteCallback(this.OnFinish,this.Data)
                return
            }
            let step=this.Context.Enter(app.Data.Room.Exits)
            if (step){
                this.Current=step
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