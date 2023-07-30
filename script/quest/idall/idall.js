(function (App) {
    App.Quest.IDAll = {}
    App.Quest.IDAll.Data={}
    let ignoreUnits="两文块张碗匹枚"
    App.Quest.IDAll.Start=function(){
        App.Quest.IDAll.Data={
            Items:{}
        }
        App.Commands([
            App.NewCommand("do","i2"),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                for(var i=0;i<App.Data.Items.length;i++){
                    let item=App.Data.Items[i]
                    let id=item.ID.toLowerCase()
                    let itemnum=CNumber.Split(item.Name)
                    if (itemnum.Unit&&(ignoreUnits.indexOf(itemnum.Unit)>-1)){
                        continue
                    }
                    if (!App.Quest.IDAll.Data.Items[id]){
                        App.Quest.IDAll.Data.Items[id]=0
                    }

                    for (k=0;k<itemnum.Count;k++){
                        App.Quest.IDAll.Data.Items[id]++
                        App.Send("identify "+id+" "+App.Quest.IDAll.Data.Items[id])
                    }  
                }
                App.Next()
            }),
            App.NewCommand("nobusy"),
            App.NewCommand("function",function(){
                Note("鉴定完毕，sell all记得设置rbz_filter,如")
                Note("set rbz_filter hole:2|damage:200|armor:200|suit:1")
                App.Next()
            })
        ]).Push()
        App.Next()
    }    
    })(App)