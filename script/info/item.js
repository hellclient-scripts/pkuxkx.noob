(function (app) {
    let sep=/\|\|/
    let item=Include("include/item.js")
    app.Info.Items=[]
    app.Info.BuiltinItems=[]
    app.RegisterCallback("info.items.loaditems", function () {
        app.Info.BuiltinItems= world.ReadLines("info/data/items.txt")
        app.Info.BuiltinItems.forEach(function(line){
            let i= new item()
            var data=line.split(sep)
            i.ID=data[0]
            i.Name=data[1]
            i.Label=data[2]
            i.Type=data[3]
            i.Location=data[4]
            i.Command=data[5]
            i.Interval=data[6]?data[6]-0:0
            i.Comment=data[7]
            app.Info.Items.push(i)
        })
    })
    app.RegisterAPI("GetItem", function (id) {
        for (var key in app.Info.Items){
            if (app.Info.Items[key].ID==id){
                return app.Info.Items[key]
            }
        }
        return null
    })
    app.RegisterAPI("GetItemsByName", function (name,ignorecase) {
        let result=[]
        if (ignorecase){
            name=name.toLowerCase()
        }
        app.Info.Items.forEach(function(data){
            let itemname=data.Name
            if (ignorecase){
                itemname=itemname.toLowerCase()
            }
            if (itemname===name){
                result.push(data)
            }
        })
        return result
    })
    app.RegisterAPI("GetItemsByLabel", function (label) {
        let result=[]

        app.Info.Items.forEach(function(data){
            if (data.Label===label){
                result.push(data)
            }
        })
        return result
    })
    app.Bind("Ready", "info.items.loaditems")
})(App)