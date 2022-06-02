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
    App.Core.Traversal.PickType=function(key,title,desc){
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