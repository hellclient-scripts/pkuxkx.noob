(function (app) {
    let sep=/\|\|/
    let item=Include("include/item.js")
    app.Info.Items=[]
    app.Info.BuiltinItems=[]
    app.Info.UserItems=[]
    let loaditems=function(data){
        data.forEach(function(line){
            let i= new item()
            var data=line.split(sep)
            i.ID=data[0]
            i.Alias=data[1]
            i.Name=data[2]
            i.Label=data[3]
            i.Type=data[4]
            i.Location=data[5]
            i.Command=data[6]
            i.Interval=data[7]?data[7]-0:0
            i.Comment=data[8]
            app.Info.Items.push(i)
        })
    }
    app.RegisterCallback("info.items.loaditems", function () {
        app.Info.BuiltinItems= world.ReadLines("info/data/items.txt")
        if (world.HasHomeFile("data/items.txt")){
            app.Info.UserItems=world.ReadHomeLines("data/items.txt")
        }
        app.API.ResetItems()
    })
    app.RegisterAPI("SaveUserItems",function(){
        let data=app.Info.UserItems.join("\n")
        world.WriteHomeFile("data/items.txt",data)
    })
    app.RegisterAPI("ResetItems",function(){
        loaditems(app.Info.BuiltinItems)
        loaditems(app.Info.UserItems)
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