(function(app){
    const pagesize=10
    app.InfoUIDataShowList=function() {
        var list=Userinput.newlist("请选择你要管理的数据","请选择你要管理的数据")
        list.append("builtinrooms","内建房间信息(只读)")
        list.append("userrooms","用户房间信息")
        list.append("builtinpaths","内建路径信息(只读)")
        list.append("userpaths","用户路径信息")

        list.send("App.InfoUIData")
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
            if (i>=start && i<end){
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
            app.SaveUserRooms()
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
            app.SaveUserRooms()
        }
    }
    UserroomsGrid.setondelete("App.InfoUIDataUserroomsGridOnDelete")
    app.InfoUIDataUserroomsGridOnDelete=function(name,id,code,data){
        if (code==0 && data){
            app.Info.UserRooms.splice(data-0,1)
            publishgrid(UserroomsGrid,app.Info.UserRooms)
            app.SaveUserRooms()
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
        Userinput.alert("","查看内建房间",app.Info.UserPaths[data-0])
    }
}
UserpathsGrid.setoncreate("App.InfoUIDataUserpathsGridOnCreate")
app.InfoUIDataUserpathsGridOnCreate=function(name,id,code,data){
    if (code==0){
        Userinput.prompt("App.InfoUIDataUserpathsGridOnCreateSubmit","添加路径","请添加房间，格式为 [to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath] 如 yz||yzyp||||e;e;n||s;w;w","[to]||[from]||[tag1],[tag2],[!tag3]||[topath]||[frompath]")
    }
}
app.InfoUIDataUserpathsGridOnCreateSubmit=function(name,id,code,data){
    if (code==0 && data){
        app.Info.UserPaths.push(data)
        publishgrid(UserpathsGrid,app.Info.UserPaths)
        app.SaveUserPaths()
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
        app.SaveUserPaths()
    }
}
UserpathsGrid.setondelete("App.InfoUIDataUserpathsGridOnDelete")
app.InfoUIDataUserpathsGridOnDelete=function(name,id,code,data){
    if (code==0 && data){
        app.Info.UserPaths.splice(data-0,1)
        publishgrid(UserpathsGrid,app.Info.UserPaths)
        app.SaveUserPaths()
    }
}
})(App)