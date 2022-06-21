(function(App){
    const pagesize=10
    App.InfoUIDataShowList=function() {
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
    App.InfoUIData=function(name,id,code,data) {
        if (code==0 && data){
            switch (data){
                case "builtinrooms":
                    BuiltinroomsGrid.setpage(1)
                    BuiltinroomsGrid.setfilter("")
                    publishgrid(BuiltinroomsGrid,App.Info.BuiltinRooms)
                break
                case "userrooms":
                    UserroomsGrid.setpage(1)
                    UserroomsGrid.setfilter("")
                    publishgrid(UserroomsGrid,App.Info.UserRooms)
                break
                case "builtinpaths":
                    BuiltinpathsGrid.setpage(1)
                    BuiltinpathsGrid.setfilter("")
                    publishgrid(BuiltinpathsGrid,App.Info.BuiltinPaths)
                break
                case "userpaths":
                    UserpathsGrid.setpage(1)
                    UserpathsGrid.setfilter("")
                    publishgrid(UserpathsGrid,App.Info.UserPaths)
                break
                case "builtinitems":
                    BuiltinitemsGrid.setpage(1)
                    BuiltinitemsGrid.setfilter("")
                    publishgrid(BuiltinitemsGrid,App.Info.BuiltinItems)
                break
                case "useritems":
                    UserItemsGrid.setpage(1)
                    UserItemsGrid.setfilter("")
                    publishgrid(UserItemsGrid,App.Info.UserItems)
                break
                case "builtinpatrols":
                    BuiltinpatrolsGrid.setpage(1)
                    BuiltinpatrolsGrid.setfilter("")
                    publishgrid(BuiltinpatrolsGrid,App.Info.BuiltinPatrols)
                break
                case "userpatrols":
                    UserPatrolsGrid.setpage(1)
                    UserPatrolsGrid.setfilter("")
                    publishgrid(UserPatrolsGrid,App.Info.UserPatrols)
                break
            }
        }
    }
    
    App.RegisterAssistant("data","数据管理",App.InfoUIDataShowList,50)
    let publishgrid=function(grid,alldata){
        let page=grid.getpage()
        let filter=grid.getfilter()
        let start=(page-1)*pagesize
        let end=page*pagesize
        let count=0
        grid.resetitems()
        for (let i=0;i<alldata.length;i++){
            let data=alldata[i]
            if (data==""||data.slice(0,2)=="//"){
                continue
            }
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
    App.InfoUIDataBuiltinroomsGridOnPage=function(name,id,code,data){
        if (code==0 && data){
            BuiltinroomsGrid.setpage(data-0)
            publishgrid(BuiltinroomsGrid,App.Info.BuiltinRooms)
        }
    }
    BuiltinroomsGrid.setonfilter("App.InfoUIDataBuiltinroomsGridOnFilter")
    App.InfoUIDataBuiltinroomsGridOnFilter=function(name,id,code,data){
        if (code==0){
            BuiltinroomsGrid.setpage(1)
            BuiltinroomsGrid.setfilter(data)

            publishgrid(BuiltinroomsGrid,App.Info.BuiltinRooms)

        }
    }
    BuiltinroomsGrid.setonview("App.InfoUIDataBuiltinroomsGridOnView")
    App.InfoUIDataBuiltinroomsGridOnView=function(name,id,code,data){
        if (code==0 && data){
            Userinput.alert("","查看内建房间",App.Info.BuiltinPaths[data-0])
        }
    }

    let BuiltinpathsGrid=Userinput.newdatagrid("内建路径信息","内建路径信息管理")
    BuiltinpathsGrid.setonpage("App.InfoUIDataBuiltinpathsGridOnPage")
    App.InfoUIDataBuiltinpathsGridOnPage=function(name,id,code,data){
        if (code==0 && data){
            BuiltinpathsGrid.setpage(data-0)
            publishgrid(BuiltinpathsGrid,App.Info.BuiltinPaths)
        }
    }
    BuiltinpathsGrid.setonfilter("App.InfoUIDataBuiltinpathsGridOnFilter")
    App.InfoUIDataBuiltinpathsGridOnFilter=function(name,id,code,data){
        if (code==0){
            BuiltinpathsGrid.setpage(1)
            BuiltinpathsGrid.setfilter(data)

            publishgrid(BuiltinpathsGrid,App.Info.BuiltinPaths)

        }
    }
    BuiltinpathsGrid.setonview("App.InfoUIDataBuiltinpathsGridOnView")
    App.InfoUIDataBuiltinpathsGridOnView=function(name,id,code,data){
        if (code==0 && data){
            Userinput.alert("","查看内建路径",App.Info.BuiltinPaths[data-0])
        }
    }

    let UserroomsGrid=Userinput.newdatagrid("用户房间信息","用户房间信息管理")
    UserroomsGrid.setonpage("App.InfoUIDataUserroomsGridOnPage")
    App.InfoUIDataUserroomsGridOnPage=function(name,id,code,data){
        if (code==0 && data){
            UserroomsGrid.setpage(data-0)
            publishgrid(UserroomsGrid,App.Info.UserRooms)
        }
    }
    UserroomsGrid.setonfilter("App.InfoUIDataUserroomsGridGridOnFilter")
    App.InfoUIDataUserroomsGridGridOnFilter=function(name,id,code,data){
        if (code==0){
            UserroomsGrid.setpage(1)
            UserroomsGrid.setfilter(data)

            publishgrid(UserroomsGrid,App.Info.UserRooms)

        }
    }
    UserroomsGrid.setonview("App.InfoUIDataUserroomsGridOnView")
    App.InfoUIDataUserroomsGridOnView=function(name,id,code,data){
        if (code==0 && data){
            Userinput.alert("","查看内建房间",App.Info.UserRooms[data-0])
        }
    }
    UserroomsGrid.setoncreate("App.InfoUIDataUserroomsGridOnCreate")
    App.InfoUIDataUserroomsGridOnCreate=function(name,id,code,data){
        if (code==0){
            Userinput.prompt("App.InfoUIDataUserroomsGridOnCreateSubmit","添加房间","请添加房间，格式为 [id]||[名称]||[描述]||[识别类型]||[识别标志] 如 yz||扬州广场||||Landmark||Rong shu","[id]||[名称]||[描述]||[识别类型]||[识别标志]")
        }
    }
    App.InfoUIDataUserroomsGridOnCreateSubmit=function(name,id,code,data){
        if (code==0 && data){
            App.Info.UserRooms.push(data)
            publishgrid(UserroomsGrid,App.Info.UserRooms)
            App.API.SaveUserRooms()
        }
    }
    UserroomsGrid.setonupdate("App.InfoUIDataUserroomsGridOnUpdate")
    let updateingroom
    App.InfoUIDataUserroomsGridOnUpdate=function(name,id,code,data){
        updateingroom=data-0
        if (code==0){
            Userinput.prompt("App.InfoUIDataUserroomsGridOnUpdateSubmit","编辑房间","编辑房间，格式为 [id]||[名称]||[描述]||[识别类型]||[识别标志] 如 yz||扬州广场||||Landmark||Rong shu",App.Info.UserRooms[updateingroom])
        }
    }
    App.InfoUIDataUserroomsGridOnUpdateSubmit=function(name,id,code,data){
        if (code==0){
            App.Info.UserRooms[updateingroom]=data
            publishgrid(UserroomsGrid,App.Info.UserRooms)
            App.API.SaveUserRooms()
        }
    }
    UserroomsGrid.setondelete("App.InfoUIDataUserroomsGridOnDelete")
    App.InfoUIDataUserroomsGridOnDelete=function(name,id,code,data){
        if (code==0 && data){
            App.Info.UserRooms.splice(data-0,1)
            publishgrid(UserroomsGrid,App.Info.UserRooms)
            App.API.SaveUserRooms()
        }
    }

    let UserpathsGrid=Userinput.newdatagrid("用户房间信息","用户房间信息管理")
UserpathsGrid.setonpage("App.InfoUIDataUserpathsGridOnPage")
App.InfoUIDataUserpathsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        UserpathsGrid.setpage(data-0)
        publishgrid(UserpathsGrid,App.Info.UserPaths)
    }
}
UserpathsGrid.setonfilter("App.InfoUIDataUserpathsGridGridOnFilter")
App.InfoUIDataUserpathsGridGridOnFilter=function(name,id,code,data){
    if (code==0){
        UserpathsGrid.setpage(1)
        UserpathsGrid.setfilter(data)

        publishgrid(UserpathsGrid,App.Info.UserPaths)

    }
}
UserpathsGrid.setonview("App.InfoUIDataUserpathsGridOnView")
App.InfoUIDataUserpathsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看用户路径",App.Info.UserPaths[data-0])
    }
}
UserpathsGrid.setoncreate("App.InfoUIDataUserpathsGridOnCreate")
App.InfoUIDataUserpathsGridOnCreate=function(name,id,code,data){
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserpathsGridOnCreateSubmit","添加路径","请添加路径，格式为 [to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath] 如 yz||yzyp||||e;e;n||s;w;w","[to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath]")
    }
}
App.InfoUIDataUserpathsGridOnCreateSubmit=function(name,id,code,data){
    if (code==0 && data){
        App.Info.UserPaths.push(data)
        publishgrid(UserpathsGrid,App.Info.UserPaths)
        App.API.ResetMapper()
        App.API.SaveUserPaths()
    }
}
UserpathsGrid.setonupdate("App.InfoUIDataUserpathsGridOnUpdate")
let updateingpath
App.InfoUIDataUserpathsGridOnUpdate=function(name,id,code,data){
    updateingpath=data-0
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserpathsGridOnUpdateSubmit","编辑路径","编辑路径，格式为 [to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath] 如 yz||yzyp||||e;e;n||s;w;w",App.Info.UserPaths[updateingpath])
    }
}
App.InfoUIDataUserpathsGridOnUpdateSubmit=function(name,id,code,data){
    if (code==0){
        App.Info.UserPaths[updateingpath]=data
        publishgrid(UserpathsGrid,App.Info.UserPaths)
        App.API.ResetMapper()
        App.API.SaveUserPaths()
    }
}
UserpathsGrid.setondelete("App.InfoUIDataUserpathsGridOnDelete")
App.InfoUIDataUserpathsGridOnDelete=function(name,id,code,data){
    if (code==0 && data){
        App.Info.UserPaths.splice(data-0,1)
        publishgrid(UserpathsGrid,App.Info.UserPaths)
        App.API.ResetMapper()
        App.API.SaveUserPaths()
    }
}

let BuiltinitemsGrid=Userinput.newdatagrid("内建道具信息","内建道具信息管理")
BuiltinitemsGrid.setonpage("App.InfoUIDataBuiltinitemsGridOnPage")
App.InfoUIDataBuiltinitemsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        BuiltinitemsGrid.setpage(data-0)
        publishgrid(BuiltinitemsGrid,App.Info.BuiltinItems)
    }
}
BuiltinitemsGrid.setonfilter("App.InfoUIDataBuiltinitemsGridOnFilter")
App.InfoUIDataBuiltinitemsGridOnFilter=function(name,id,code,data){
    if (code==0){
        BuiltinitemsGrid.setpage(1)
        BuiltinitemsGrid.setfilter(data)

        publishgrid(BuiltinitemsGrid,App.Info.BuiltinItems)

    }
}
BuiltinitemsGrid.setonview("App.InfoUIDataBuiltinitemsGridOnView")
App.InfoUIDataBuiltinitemsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看内建道具",App.Info.BuiltinItems[data-0])
    }
}

let UserItemsGrid=Userinput.newdatagrid("用户道具信息","用户道具信息管理")
UserItemsGrid.setonpage("App.InfoUIDataUserItemsGridOnPage")
App.InfoUIDataUserItemsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        UserItemsGrid.setpage(data-0)
        publishgrid(UserItemsGrid,App.Info.UserItems)
    }
}
UserItemsGrid.setonfilter("App.InfoUIDataUserItemsGridGridOnFilter")
App.InfoUIDataUserItemsGridGridOnFilter=function(name,id,code,data){
    if (code==0){
        UserItemsGrid.setpage(1)
        UserItemsGrid.setfilter(data)

        publishgrid(UserItemsGrid,App.Info.UserItems)

    }
}
UserItemsGrid.setonview("App.InfoUIDataUserItemsGridOnView")
App.InfoUIDataUserItemsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看用户道具",App.Info.UserItems[data-0])
    }
}
UserItemsGrid.setoncreate("App.InfoUIDataUserItemsGridOnCreate")
App.InfoUIDataUserItemsGridOnCreate=function(name,id,code,data){
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserItemsGridOnCreateSubmit","添加道具","请添加道具，格式为 [ID]||[Alias]||[Name]||[Label]||[Type]||[Location]||[Command]||[Interval]||[Comment]如 gan liang||gan liang||Gan liang||干粮||goods||yz-zxl||buy gan liang ||||","[ID]||[Alias]||[Name]||[Label]||[Type]||[Location]||[Command]||[Interval]||[Comment]")
    }
}
App.InfoUIDataUserItemsGridOnCreateSubmit=function(name,id,code,data){
    if (code==0 && data){
        App.Info.UserItems.push(data)
        publishgrid(UserItemsGrid,App.Info.UserItems)
        App.API.ResetMapper()
        App.API.SaveUserItems()
    }
}
UserItemsGrid.setonupdate("App.InfoUIDataUserItemsGridOnUpdate")
let updateingitem
App.InfoUIDataUserItemsGridOnUpdate=function(name,id,code,data){
    updateingitem=data-0
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserItemsGridOnUpdateSubmit","编辑道具","编辑道具，格式为 [ID]||[Alias]||[Name]||[Label]||[Type]||[Location]||[Command]||[Interval]||[Comment]如 gan liang||gan liang||Gan liang||干粮||goods||yz-zxl||buy gan liang ||||",App.Info.UserItems[updateingitem])
    }
}
App.InfoUIDataUserItemsGridOnUpdateSubmit=function(name,id,code,data){
    if (code==0){
        App.Info.UserItems[updateingitem]=data
        publishgrid(UserItemsGrid,App.Info.UserItems)
        App.API.ResetMapper()
        App.API.SaveUserItems()
    }
}
UserItemsGrid.setondelete("App.InfoUIDataUserItemsGridOnDelete")
App.InfoUIDataUserItemsGridOnDelete=function(name,id,code,data){
    if (code==0 && data){
        App.Info.UserItems.splice(data-0,1)
        publishgrid(UserItemsGrid,App.Info.UserItems)
        App.API.ResetMapper()
        App.API.SaveUserItems()
    }
}

let BuiltinpatrolsGrid=Userinput.newdatagrid("内建路线信息","内建路线信息管理")
BuiltinpatrolsGrid.setonpage("App.InfoUIDataBuiltinpatrolsGridOnPage")
App.InfoUIDataBuiltinpatrolsGridOnPage=function(name,id,code,data){
    if (code==0 && data){
        BuiltinpatrolsGrid.setpage(data-0)
        publishgrid(BuiltinpatrolsGrid,App.Info.BuiltinPatrols)
    }
}
BuiltinpatrolsGrid.setonfilter("App.InfoUIDataBuiltinpatrolsGridOnFilter")
App.InfoUIDataBuiltinpatrolsGridOnFilter=function(name,id,code,data){
    if (code==0){
        BuiltinpatrolsGrid.setpage(1)
        BuiltinpatrolsGrid.setfilter(data)

        publishgrid(BuiltinpatrolsGrid,App.Info.BuiltinPatrols)

    }
}
BuiltinpatrolsGrid.setonview("App.InfoUIDataBuiltinpatrolsGridOnView")
App.InfoUIDataBuiltinpatrolsGridOnView=function(name,id,code,data){
    if (code==0 && data){
        Userinput.alert("","查看内建路线",App.Info.BuiltinPatrols[data-0])
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
        App.Info.ReloadPatrols()
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
        App.Info.ReloadPatrols()
        App.API.SaveUserPatrols()
    }
}
UserPatrolsGrid.setondelete("App.InfoUIDataUserPatrolsGridOnDelete")
App.InfoUIDataUserPatrolsGridOnDelete=function(name,id,code,data){
    if (code==0 && data){
        App.Info.UserPatrols.splice(data-0,1)
        publishgrid(UserPatrolsGrid,App.Info.UserPatrols)
        App.Info.ReloadPatrols()
        App.API.SaveUserPatrols()
    }
}
})(App)