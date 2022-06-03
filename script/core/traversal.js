(function (App) {
    App.Core.Traversal={}
    let pagesize=10
    let publishgrid=function(grid,alldata){
        let page=grid.getpage()
        let filter=grid.getfilter()
        let start=(page-1)*pagesize
        let end=page*pagesize
        let count=0
        grid.resetitems()
        for (let i=0;i<alldata.length;i++){
            let data=alldata[i]
            if (filter && data.indexOf(filter)<0){
                continue
            }
            count++
            if (count>=start && count<end){
                grid.append(i,alldata[i])
            }
        }
        grid.setmaxpage(Math.ceil(count/pagesize))
        grid.publish("")
    }
    let Grid
    
    App.Core.OnPage=function(name,id,code,data){
        if (code==0 && data){
            Grid.setpage(data-0)
            publishgrid(Grid,App.Info.PatrolsList)
        }
    }
    App.Core.OnFilter=function(name,id,code,data){
        if (code==0){
            Grid.setpage(1)
            Grid.setfilter(data)

            publishgrid(Grid,App.Info.PatrolsList)

        }
    }


    App.Data.Traversal={}
    App.Core.Traversal.PromptTarget=function(key,title,desc,output){
        let vp=Userinput.newvisualprompt(title+" [ "+key+" ]",desc,output)
        vp.setmediatype("output")
        vp.publish("App.Core.Traversal.OnTarget")
    }
    App.Core.Traversal.PromptTargetText=function(key,title,desc,lines){
        let vp=Userinput.newvisualprompt(title+" [ "+key+" ]",desc,lines)
        vp.setmediatype("text")
        vp.publish("App.Core.Traversal.OnTarget")
    }
    App.Core.Traversal.Target=function(data){
        App.Data.Traversal.Target=data
        App.OnStateEvent("traversal.target")
    }

    App.Core.Traversal.OnTarget=function(name,id,code,data){
        Userinput.hideall()
        if (code==0&&data){
            App.Core.Traversal.Answer(data)
        }else{
            App.Core.Traversal.Answer("")
        }
    }
    App.Core.Traversal.PickType=function(){
        var List = Userinput.newlist("类型", "请选择你的遍历类型", false)
        List.append("walk","浏览")
        List.append("findroom","寻找房间")
        List.append("findobj","寻找对象")
        List.publish("App.Core.Traversal.OnPickType")
    }
    App.Core.Traversal.OnPickType=function(name,id,code,data){
        if (code==0){
            App.Core.Traversal.Type(data)
        }else{
            App.Core.Traversal.Type("")
        }
    }
    App.Core.Traversal.Type=function(data){
        App.Data.Traversal.Type=data
        App.OnStateEvent("traversal.type")
    }
    App.Core.Traversal.Show=function(key,title,desc){
        App.Data.Traversal.Key=key
        App.Data.Traversal.Silence=false
        App.Data.Traversal.Title=title
        App.Data.Traversal.Desc=desc
        App.Data.Traversal.Answer=""
        App.Raise("puzzle")
        if (App.Data.Traversal.Silence){
            return
        }
        Grid=Userinput.newdatagrid(title+" [ "+key+" ]",desc)
        Grid.setpage(1)
        Grid.setfilter("")
        Grid.setonpage("App.Core.OnPage")
        Grid.setonfilter("App.Core.OnFilter")
        Grid.setonselect("App.Core.Traversal.OnAnswer")

        publishgrid(Grid,App.Info.PatrolsList)
    }
    App.Core.Traversal.Answer=function(answer){
        App.Data.Traversal.Answer=answer
        App.OnStateEvent("traversal.answer")
    }
    App.Core.Traversal.OnAnswer=function(name,id,code,data){
        Grid.hide()
        if (code==0&&data){
            App.Core.Traversal.Answer(data)
        }else{
            App.Core.Traversal.Answer("")
        }
    }
})(App)