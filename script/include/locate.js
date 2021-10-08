(function(){
    var backward=Include("include/backward.js")
    var Step=Include("include/step.js")
    let Locate=function(depth){
        //最大步数
        this.Depth=depth?depth:1
        //层级信息
        this.Levels=[]
        //返回列表
        this.Returns=[]
    }
    Locate.prototype.NextStep=function(){
        if (this.OutOfRange() || this.AllWalked()){
            //回到原点，无路可走
            if (this.Levels.length <=1 ){
                return null
            }
            //回退一步
            return new Step(this.Returns[this.Returns.length-1])
        }
        //进入当前房间的下一个出口
        return new Step(this.Levels[this.Levels.length-1][0])

    }
    Locate.prototype.OutOfRange=function(){
        return this.Levels.length>this.Depth
    }
    Locate.prototype.AllWalked=function(){
        return this.Levels[this.Levels.length-1].length==0
    }
    Locate.prototype.Skip=function(){
        if (this.AllWalked()){
            return null
        }
        this.Levels[this.Levels.length-1].shift()
        return this.NextStep()
    }
    
    //进入新房间，传入当前房间出口，返回下一步行动的出口，失败返回null
    Locate.prototype.Enter=function(exits){
        //确定是否是回退
        if (this.Levels.length){
            if ( this.OutOfRange()|| this.AllWalked()){
                //回退成功
                this.Levels.pop()
                this.Returns.pop()
                return this.NextStep()
            }
        }
        //不是回退，是进入更深的一层
        let step=null
        if (this.Levels.length){
            //进入当前层的命令
            step=this.Levels[this.Levels.length-1].shift()
        }
        let level=[]
        let returnstep=null
        exits.forEach(function(data){
            let back=backward[data]
            //只进入可以回退的出口
            if (back){
                //是返回的出口,不再进入
                if (back==step){
                    returnstep=data
                }else{
                    level.push(data)
                }
            }
        })
        //未找到回退记录时的处理，
        if (step && !returnstep){
            //退无可退，失败退出
            if (level.length==0){
                return null
            }
            //将最后一个出口当成回退出口
            returnstep=level.pop()
        }
        //压入数据
        this.Returns.push(returnstep)
        this.Levels.push(level)
        return this.NextStep()
    }
    return Locate
})()