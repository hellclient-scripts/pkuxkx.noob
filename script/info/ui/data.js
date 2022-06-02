(function(app){
    const pagesize=10
    app.InfoUIDataShowList=function() {
        var list=Userinput.newlist("请选择你要管理的数据","请选择你要管理的数据")
        list.append("builtinrooms","内建房间信息(只读)")
        list.append("userrooms","用户房间信息")
        list.append("builtinpaths","内建路径信息(只读)")
        list.append("userpaths","用户路径信息")
        list.append("builtinitems","内建道具信息(只读)")
        list.append("useritems","用户道具信息")
        list.append("builtinpatrols","内建路线信息(只读)")
        list.append("userpatrols","用户路线信息")

        list.publish("App.InfoUIData")
    }
    app.InfoUIData=function(name,id,code,data) {
        if (code==0 && data){
            switch (data){
                case "builtinrooms":
                    BuiltinroomsGrid.setpage(1)
                    BuiltinroomsGrid.setfilter("")
                    publishgrid(BuiltinroomsGrid,app.Info.BuiltinRooms)
                break
                case "userrooms":
                    UserroomsGrid.setpage(1)
                    UserroomsGrid.setfilter("")
                    publishgrid(UserroomsGrid,app.Info.UserRooms)
                break
                case "builtinpaths":
                    BuiltinpathsGrid.setpage(1)
                    BuiltinpathsGrid.setfilter("")
                    publishgrid(BuiltinpathsGrid,app.Info.BuiltinPaths)
                break
                case "userpaths":
                    UserpathsGrid.setpage(1)
                    UserpathsGrid.setfilter("")
                    publishgrid(UserpathsGrid,app.Info.UserPaths)
                break
                case "builtinitems":
                    BuiltinitemsGrid.setpage(1)
                    BuiltinitemsGrid.setfilter("")
                    publishgrid(BuiltinitemsGrid,app.Info.BuiltinItems)
                break
                case "useritems":
                    UserItemsGrid.setpage(1)
                    UserItemsGrid.setfilter("")
                    publishgrid(UserItemsGrid,app.Info.UserItems)
                break
                case "builtinpatrols":
                    BuiltinpatrolsGrid.setpage(1)
                    BuiltinpatrolsGrid.setfilter("")
                    publishgrid(BuiltinpatrolsGrid,app.Info.BuiltinPatrols)
                break
                case "userpatrols":
                    UserPatrolsGrid.setpage(1)
                    UserPatrolsGrid.setfilter("")
                    publishgrid(UserPatrolsGrid,app.Info.UserPatrols)
                break
            }
        }
    }
    
    app.RegisterAssistant("data","数据管理",app.InfoUIDataShowList,50)
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
    let BuiltinroomsGrid=Userinput.newdatagrid("内建房间信息","内建房间信息管理")
    BuiltinroomsGrid.setonpage("App.InfoUIDataBuiltinroomsGridOnPage")
    app.InfoUIDataBuiltinroomsGridOnPage=function(name,id,code,data){
        if (code==0 && data){
            BuiltinroomsGrid.setpage(data-0)
            publishgrid(BuiltinroomsGrid,app.Info.BuiltinRooms)
        }
    }
    BuiltinroomsGrid.setonfilter("App.InfoUIDataBuiltinroomsGridOnFilter")
    app.InfoUIDataBuiltinroomsGridOnFilter=function(name,id,code,data){
        if (code==0){
            BuiltinroomsGrid.setpage(1)
            BuiltinroomsGrid.setfilter(data)

            publishgrid(BuiltinroomsGrid,app.Info.BuiltinRooms)

        }
    }
    BuiltinroomsGrid.setonview("App.InfoUIDataBuiltinroomsGridOnView")
    app.InfoUIDataBuiltinroomsGridOnView=function(name,id,code,data){
        if (code==0 && data){
            Userinput.alert("","查看内建房间",app.Info.BuiltinPaths[data-0])
        }
    }

    let BuiltinpathsGrid=Userinput.newdatagrid("内建路径信息","内建路径信息管理")
    BuiltinpathsGrid.setonpage("App.InfoUIDataBuiltinpathsGridOnPage")
    app.InfoUIDataBuiltinpathsGridOnPage=function(name,id,code,data){
        if (code==0 && data){
            BuiltinpathsGrid.setpage(data-0)
            publishgrid(BuiltinpathsGrid,app.Info.BuiltinPaths)
        }
    }
    BuiltinpathsGrid.setonfilter("App.InfoUIDataBuiltinpathsGridOnFilter")
    app.InfoUIDataBuiltinpathsGridOnFilter=function(name,id,code,data){
        if (code==0){
            BuiltinpathsGrid.setpage(1)
            BuiltinpathsGrid.setfilter(data)

            publishgrid(BuiltinpathsGrid,app.Info.BuiltinPaths)

        }
    }
    BuiltinpathsGrid.setonview("App.InfoUIDataBuiltinpathsGridOnView")
    app.InfoUIDataBuiltinpathsGridOnView=function(name,id,code,data){
        if (code==0 && data){
            Userinput.alert("","查看内建路径",app.Info.BuiltinPaths[data-0])
        }
    }

    let UserroomsGrid=Userinput.newdatagrid("用户房间信息","用户房间信息管理")
    UserroomsGrid.setonpage("App.InfoUIDataUserroomsGridOnPage")
    app.InfoUIDataUserroomsGridOnPage=function(name,id,code,data){
        if (code==0 && data){
            UserroomsGrid.setpage(data-0)
            publishgrid(UserroomsGrid,app.Info.UserRooms)
        }
    }
    UserroomsGrid.setonfilter("App.InfoUIDataUserroomsGridGridOnFilter")
    app.InfoUIDataUserroomsGridGridOnFilter=function(name,id,code,data){
        if (code==0){
            UserroomsGrid.setpage(1)
            UserroomsGrid.setfilter(data)

            publishgrid(UserroomsGrid,app.Info.UserRooms)

        }
    }
    UserroomsGrid.setonview("App.InfoUIDataUserroomsGridOnView")
    app.InfoUIDataUserroomsGridOnView=function(name,id,code,data){
        if (code==0 && data){
            Userinput.alert("","查看内建房间",app.Info.UserRooms[data-0])
        }
    }
    UserroomsGrid.setoncreate("App.InfoUIDataUserroomsGridOnCreate")
    app.InfoUIDataUserroomsGridOnCreate=function(name,id,code,data){
        if (code==0){
            Userinput.prompt("App.InfoUIDataUserroomsGridOnCreateSubmit","添加房间","请添加房间，格式为 [id]||[名称]||[描述]||[识别类型]||[识别标志] 如 yz||扬州广场||||Landmark||Rong shu","[id]||[名称]||[描述]||[识别类型]||[识别标志]")
        }
    }
    app.InfoUIDataUserroomsGridOnCreateSubmit=function(name,id,code,data){
        if (code==0 && data){
            app.Info.UserRooms.push(data)
            publishgrid(UserroomsGrid,app.Info.UserRooms)
            app.API.SaveUserRooms()
        }
    }
    UserroomsGrid.setonupdate("App.InfoUIDataUserroomsGridOnUpdate")
    let updateingroom
    app.InfoUIDataUserroomsGridOnUpdate=function(name,id,code,data){
        updateingroom=data-0
        if (code==0){
            Userinput.prompt("App.InfoUIDataUserroomsGridOnUpdateSubmit","编辑房间","编辑房间，格式为 [id]||[名称]||[描述]||[识别类型]||[识别标志] 如 yz||扬州广场||||Landmark||Rong shu",app.Info.UserRooms[updateingroom])
        }
    }
    app.InfoUIDataUserroomsGridOnUpdateSubmit=function(name,id,code,data){
        if (code==0){
            app.Info.UserRooms[updateingroom]=data
            publishgrid(UserroomsGrid,app.Info.UserRooms)
            app.API.SaveUserRooms()
        }
    }
    UserroomsGrid.setondelete("App.InfoUIDataUserroomsGridOnDelete")
    app.InfoUIDataUserroomsGridOnDelete=function(name,id,code,data){
        if (code==0 && data){
            app.Info.UserRooms.splice(data-0,1)
            publishgrid(UserroomsGrid,app.Info.UserRooms)
            app.API.SaveUserRooms()
        }
    }

    let UserpathsGrid=Userinput.newdatagrid("用户房间信息","用户房间信息管理")
UserpathsGrid.setonpage("App.InfoUIDataUserpathsGridOnPage")
app.InfoUIDataUserpathsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        UserpathsGrid.setpage(data-0)
        publishgrid(UserpathsGrid,app.Info.UserPaths)
    }
}
UserpathsGrid.setonfilter("App.InfoUIDataUserpathsGridGridOnFilter")
app.InfoUIDataUserpathsGridGridOnFilter=function(name,id,code,data){
    if (code==0){
        UserpathsGrid.setpage(1)
        UserpathsGrid.setfilter(data)

        publishgrid(UserpathsGrid,app.Info.UserPaths)

    }
}
UserpathsGrid.setonview("App.InfoUIDataUserpathsGridOnView")
app.InfoUIDataUserpathsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看用户路径",app.Info.UserPaths[data-0])
    }
}
UserpathsGrid.setoncreate("App.InfoUIDataUserpathsGridOnCreate")
app.InfoUIDataUserpathsGridOnCreate=function(name,id,code,data){
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserpathsGridOnCreateSubmit","添加路径","请添加路径，格式为 [to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath] 如 yz||yzyp||||e;e;n||s;w;w","[to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath]")
    }
}
app.InfoUIDataUserpathsGridOnCreateSubmit=function(name,id,code,data){
    if (code==0 && data){
        app.Info.UserPaths.push(data)
        publishgrid(UserpathsGrid,app.Info.UserPaths)
        app.API.ResetMapper()
        app.API.SaveUserPaths()
    }
}
UserpathsGrid.setonupdate("App.InfoUIDataUserpathsGridOnUpdate")
let updateingpath
app.InfoUIDataUserpathsGridOnUpdate=function(name,id,code,data){
    updateingpath=data-0
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserpathsGridOnUpdateSubmit","编辑路径","编辑路径，格式为 [to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath] 如 yz||yzyp||||e;e;n||s;w;w",app.Info.UserPaths[updateingpath])
    }
}
app.InfoUIDataUserpathsGridOnUpdateSubmit=function(name,id,code,data){
    if (code==0){
        app.Info.UserPaths[updateingpath]=data
        publishgrid(UserpathsGrid,app.Info.UserPaths)
        app.API.ResetMapper()
        app.API.SaveUserPaths()
    }
}
UserpathsGrid.setondelete("App.InfoUIDataUserpathsGridOnDelete")
app.InfoUIDataUserpathsGridOnDelete=function(name,id,code,data){
    if (code==0 && data){
        app.Info.UserPaths.splice(data-0,1)
        publishgrid(UserpathsGrid,app.Info.UserPaths)
        app.API.ResetMapper()
        app.API.SaveUserPaths()
    }
}

let BuiltinitemsGrid=Userinput.newdatagrid("内建道具信息","内建道具信息管理")
BuiltinitemsGrid.setonpage("App.InfoUIDataBuiltinitemsGridOnPage")
app.InfoUIDataBuiltinitemsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        BuiltinitemsGrid.setpage(data-0)
        publishgrid(BuiltinitemsGrid,app.Info.BuiltinItems)
    }
}
BuiltinitemsGrid.setonfilter("App.InfoUIDataBuiltinitemsGridOnFilter")
app.InfoUIDataBuiltinitemsGridOnFilter=function(name,id,code,data){
    if (code==0){
        BuiltinitemsGrid.setpage(1)
        BuiltinitemsGrid.setfilter(data)

        publishgrid(BuiltinitemsGrid,app.Info.BuiltinItems)

    }
}
BuiltinitemsGrid.setonview("App.InfoUIDataBuiltinitemsGridOnView")
app.InfoUIDataBuiltinitemsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看内建道具",app.Info.BuiltinItems[data-0])
    }
}

let UserItemsGrid=Userinput.newdatagrid("用户道具信息","用户道具信息管理")
UserItemsGrid.setonpage("App.InfoUIDataUserItemsGridOnPage")
app.InfoUIDataUserItemsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        UserItemsGrid.setpage(data-0)
        publishgrid(UserItemsGrid,app.Info.UserItems)
    }
}
UserItemsGrid.setonfilter("App.InfoUIDataUserItemsGridGridOnFilter")
app.InfoUIDataUserItemsGridGridOnFilter=function(name,id,code,data){
    if (code==0){
        UserItemsGrid.setpage(1)
        UserItemsGrid.setfilter(data)

        publishgrid(UserItemsGrid,app.Info.UserItems)

    }
}
UserItemsGrid.setonview("App.InfoUIDataUserItemsGridOnView")
app.InfoUIDataUserItemsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看用户道具",app.Info.UserItems[data-0])
    }
}
UserItemsGrid.setoncreate("App.InfoUIDataUserItemsGridOnCreate")
app.InfoUIDataUserItemsGridOnCreate=function(name,id,code,data){
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserItemsGridOnCreateSubmit","添加道具","请添加道具，格式为 [ID]||[Alias]||[Name]||[Label]||[Type]||[Location]||[Command]||[Interval]||[Comment]如 gan liang||gan liang||Gan liang||干粮||goods||yz-zxl||buy gan liang ||||","[ID]||[Alias]||[Name]||[Label]||[Type]||[Location]||[Command]||[Interval]||[Comment]")
    }
}
app.InfoUIDataUserItemsGridOnCreateSubmit=function(name,id,code,data){
    if (code==0 && data){
        app.Info.UserItems.push(data)
        publishgrid(UserItemsGrid,app.Info.UserItems)
        app.API.ResetMapper()
        app.API.SaveUserItems()
    }
}
UserItemsGrid.setonupdate("App.InfoUIDataUserItemsGridOnUpdate")
let updateingitem
app.InfoUIDataUserItemsGridOnUpdate=function(name,id,code,data){
    updateingitem=data-0
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserItemsGridOnUpdateSubmit","编辑道具","编辑道具，格式为 [ID]||[Alias]||[Name]||[Label]||[Type]||[Location]||[Command]||[Interval]||[Comment]如 gan liang||gan liang||Gan liang||干粮||goods||yz-zxl||buy gan liang ||||",app.Info.UserItems[updateingitem])
    }
}
app.InfoUIDataUserItemsGridOnUpdateSubmit=function(name,id,code,data){
    if (code==0){
        app.Info.UserItems[updateingitem]=data
        publishgrid(UserItemsGrid,app.Info.UserItems)
        app.API.ResetMapper()
        app.API.SaveUserItems()
    }
}
UserItemsGrid.setondelete("App.InfoUIDataUserItemsGridOnDelete")
app.InfoUIDataUserItemsGridOnDelete=function(name,id,code,data){
    if (code==0 && data){
        app.Info.UserItems.splice(data-0,1)
        publishgrid(UserItemsGrid,app.Info.UserItems)
        app.API.ResetMapper()
        app.API.SaveUserItems()
    }
}

let BuiltinpatrolsGrid=Userinput.newdatagrid("内建路线信息","内建路线信息管理")
BuiltinpatrolsGrid.setonpage("App.InfoUIDataBuiltinpatrolsGridOnPage")
app.InfoUIDataBuiltinpatrolsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        BuiltinpatrolsGrid.setpage(data-0)
        publishgrid(BuiltinpatrolsGrid,app.Info.BuiltinPatrols)
    }
}
BuiltinpatrolsGrid.setonfilter("App.InfoUIDataBuiltinpatrolsGridOnFilter")
app.InfoUIDataBuiltinpatrolsGridOnFilter=function(name,id,code,data){
    if (code==0){
        BuiltinpatrolsGrid.setpage(1)
        BuiltinpatrolsGrid.setfilter(data)

        publishgrid(BuiltinpatrolsGrid,app.Info.BuiltinPatrols)

    }
}
BuiltinpatrolsGrid.setonview("App.InfoUIDataBuiltinpatrolsGridOnView")
app.InfoUIDataBuiltinpatrolsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看内建路线",app.Info.BuiltinPatrols[data-0])
    }
}

let UserPatrolsGrid=Userinput.newdatagrid("用户线路信息","用户线路信息管理")
UserPatrolsGrid.setonpage("App.InfoUIDataUserPatrolsGridOnPage")
App.InfoUIDataUserPatrolsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        UserPatrolsGrid.setpage(data-0)
        publishgrid(UserPatrolsGrid,App.Info.UserPatrols)
    }
}
UserPatrolsGrid.setonfilter("App.InfoUIDataUserPatrolsGridGridOnFilter")
App.InfoUIDataUserPatrolsGridGridOnFilter=function(name,id,code,data){
    if (code==0){
        UserPatrolsGrid.setpage(1)
        UserPatrolsGrid.setfilter(data)

        publishgrid(UserPatrolsGrid,App.Info.UserPatrols)

    }
}
UserPatrolsGrid.setonview("App.InfoUIDataUserPatrolsGridOnView")
App.InfoUIDataUserPatrolsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看用户线路",App.Info.UserPatrols[data-0])
    }
}
UserPatrolsGrid.setoncreate("App.InfoUIDataUserPatrolsGridOnCreate")
App.InfoUIDataUserPatrolsGridOnCreate=function(name,id,code,data){
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserPatrolsGridOnCreateSubmit","添加线路","请添加道具，格式为 [ID]||[START]||[END]||[COMMANDS]，如 yztest||yzgc||yzgc||w;w;w;e;e;e;e;e;e;w;w;w;n;n;n;s;s;s;s;s;s;n;n;n","[ID]||[START]||[END]||[COMMANDS]")
    }
}
App.InfoUIDataUserPatrolsGridOnCreateSubmit=function(name,id,code,data){
    if (code==0 && data){
        App.Info.UserPatrols.push(data)
        publishgrid(UserPatrolsGrid,App.Info.UserPatrols)
        App.API.ResetMapper()
        App.API.SaveUserPatrols()
    }
}
UserPatrolsGrid.setonupdate("App.InfoUIDataUserPatrolsGridOnUpdate")
App.InfoUIDataUserPatrolsGridOnUpdate=function(name,id,code,data){
    updateingitem=data-0
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserPatrolsGridOnUpdateSubmit","编辑线路","编辑线路，格式为 [ID]||[START]||[END]||[COMMANDS]，如 yztest||yzgc||yzgc||w;w;w;e;e;e;e;e;e;w;w;w;n;n;n;s;s;s;s;s;s;n;n;n","[ID]||[START]||[END]||[COMMANDS]",App.Info.UserPatrols[updateingitem])
    }
}
App.InfoUIDataUserPatrolsGridOnUpdateSubmit=function(name,id,code,data){
    if (code==0){
        App.Info.UserPatrols[updateingitem]=data
        publishgrid(UserPatrolsGrid,App.Info.UserPatrols)
        App.API.ResetMapper()
        App.API.SaveUserPatrols()
    }
}
UserPatrolsGrid.setondelete("App.InfoUIDataUserPatrolsGridOnDelete")
App.InfoUIDataUserPatrolsGridOnDelete=function(name,id,code,data){
    if (code==0 && data){
        App.Info.UserPatrols.splice(data-0,1)
        publishgrid(UserPatrolsGrid,App.Info.UserPatrols)
        App.API.ResetMapper()
        App.API.SaveUserPatrols()
    }
}
})(App)