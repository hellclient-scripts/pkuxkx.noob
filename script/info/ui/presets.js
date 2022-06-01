(function(App){
    const pagesize=10
let BuiltinpresetsGrid=Userinput.newdatagrid("预设任务","预设任务列表")
BuiltinpresetsGrid.setonpage("App.InfoUIDataBuiltinpresetsGridOnPage")
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
App.InfoUIDataBuiltinpresetsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        BuiltinpresetsGrid.setpage(data-0)
        publishgrid(BuiltinpresetsGrid,App.Info.BuiltinPresetsLabels)
    }
}
BuiltinpresetsGrid.setonfilter("App.InfoUIDataBuiltinpresetsGridOnFilter")
App.InfoUIDataBuiltinpresetsGridOnFilter=function(name,id,code,data){
    if (code==0){
        BuiltinpresetsGrid.setpage(1)
        BuiltinpresetsGrid.setfilter(data)
        publishgrid(BuiltinpresetsGrid,App.Info.BuiltinPresetsLabels)

    }
}
BuiltinpresetsGrid.setonview("App.InfoUIDataBuiltinpresetsGridOnView")

App.InfoUIPresetsShow=function(){
    BuiltinpresetsGrid.setpage(1)
    BuiltinpresetsGrid.setfilter("")
    publishgrid(BuiltinpresetsGrid,App.Info.BuiltinPresetsLabels)
}
App.InfoUIDataBuiltinpresetsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        BuiltinpresetsGrid.hide()
        let label=App.Info.BuiltinPresetsLabels[data]
        let preset=App.Info.BuiltinPresets[label]
        if (preset){
            var list=Userinput.newlist("查看任务"+label,preset.desc+"\n指令:\n"+preset.cmd,false)
            list.append(preset.cmd,"执行")
            list.publish("App.InfoUIDataBuiltinpresetsRun")
        }
    }
}
App.InfoUIDataBuiltinpresetsRun=function(name,id,code,data){
    if (code==0 && data){
        Execute(data)
    }
}
App.RegisterAssistant("presets","预设任务列表",App.InfoUIPresetsShow,15)

})(App)