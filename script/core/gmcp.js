
(function(App){
    App.Bind("GMCP.GMCP.Combat","core.gmcp.Fight.Msg")
    App.Bind("GMCP.GMCP.Status","core.gmcp.Status")
    App.RegisterCallback("core.gmcp.Fight.Msg",function(data){
        App.RaiseStateEvent("combat.fighting")
    })
    let map_status=function(data,source,target){
        if (data[source]){
            App.Data.HP[target]=data[source]
        }else{
            return
        }
        switch(target){
            case "exp":
                App.Data.Exp=data
                break
            case "qixue":
            case "qixue_cap":
                App.Data.HP["per_qixue"]=100*App.Data.HP["qixue"]/App.Data.HP["qixue_cap"]
            break
            case "jing":
            case "jing_cap":
                App.Data.HP["per_jing"]=100*App.Data.HP["jing"]/App.Data.HP["jing_cap"]
            break
        }
    }
    App.RegisterCallback("core.gmcp.Status",function(data){
            if (!data.id){
                map_status(data,"combat_exp","exp")
                map_status(data,"eff_qi","qixue")
                map_status(data,"qi","eff_qixue")
                map_status(data,"max_qi","qixue_cap")
                map_status(data,"eff_jing","jing")
                map_status(data,"jing","eff_jing")
                map_status(data,"max_jing","jing_cap")
                map_status(data,"neili","eff_neili")
                map_status(data,"max_neili","neili")
                map_status(data,"jingli","eff_jingli")
                map_status(data,"max_jingli","jingli")
                map_status(data,"vigour/yuan","zhenyuan")
                map_status(data,"vigour/qi","zhenqi")
                map_status(data,"water","water")
                map_status(data,"food","food")
                map_status(data,"potential","pot")
            }
    })
    App.RegisterCallback("core.gmcp.Fight.Msg",function(){
        App.RaiseStateEvent("combat.fighting")
    })
    // App.RegisterCallback("core.gmcp.hpbreif",function(data){
    //     if(!data){
    //         return
    //     }
    //     let info=data.split(",")
    //     App.Data.HP["pot"]=info[1]
    //     App.Data.HP["neili"]=info[2]
    //     App.Data.HP["eff_neili"]=info[3]
    //     App.Data.HP["jingli"]=info[4]
    //     App.Data.HP["eff_jingli"]=info[5]
    //     App.Data.HP["qixue_cap"]=info[6]
    //     App.Data.HP["qixue"]=info[7]
    //     App.Data.HP["eff_qixue"]=info[8]
    //     App.Data.HP["per_qixue"]=100*App.Data.HP["qixue"]/App.Data.HP["qixue_cap"]
    //     App.Data.HP["jing_cap"]=info[9]
    //     App.Data.HP["jing"]=info[10]
    //     App.Data.HP["eff_jing"]=info[11]
    //     App.Data.HP["per_jing"]=100*App.Data.HP["jing"]/App.Data.HP["jing_cap"]
    //     App.Data.HP["zhenqi"]=info[12]
    //     App.Data.HP["zhanyi"]=info[13]
    //     App.Data.HP["food"]=info[14]
    //     App.Data.HP["drink"]=info[15]
    //     App.Data.HP["fight"]=info[16]
    //     App.Data.HP["busy"]=info[17]
    //     if (App.Data.HP["busy"]=="1"){
    //         App.RaiseStateEvent("gmcp.busy")
    //     }else{
    //         App.RaiseStateEvent("gmcp.nobusy")
    //     }
    //     if (App.Data.HP["fight"]=="1"){
    //         App.RaiseStateEvent("combat.fighting")
    //     }else{
    //         App.RaiseStateEvent("combat.finish")
    //     }
    // })
})(App)
