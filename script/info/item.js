(function (App) {
    let sep=/\|\|/
    let item=Include("include/item.js")
    App.Info.Items=[]
    App.Info.BuiltinItems=[]
    App.Info.UserItems=[]
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
            App.Info.Items.push(i)
        })
    }
    App.RegisterCallback("info.items.loaditems", function () {
        App.Info.BuiltinItems= world.ReadLines("info/data/items.txt")
        if (world.HasHomeFile("data/items.txt")){
            App.Info.UserItems=world.ReadHomeLines("data/items.txt")
        }
        App.API.ResetItems()
    })
    App.RegisterAPI("SaveUserItems",function(){
        let data=App.Info.UserItems.join("\n")
        MakeHomeFolder("data/")
        world.WriteHomeFile("data/items.txt",data)
    })
    App.RegisterAPI("ResetItems",function(){
        loaditems(App.Info.BuiltinItems)
        loaditems(App.Info.UserItems)
    })
    App.RegisterAPI("GetItem", function (id) {
        for (var key in App.Info.Items){
            if (App.Info.Items[key].ID==id){
                return App.Info.Items[key]
            }
        }
        return null
    })
    App.RegisterAPI("GetItemsByName", function (name,ignorecase) {
        let result=[]
        if (ignorecase){
            name=name.toLowerCase()
        }
        App.Info.Items.forEach(function(data){
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
    App.RegisterAPI("GetItemsByLabel", function (label) {
        let result=[]

        App.Info.Items.forEach(function(data){
            if (data.Label===label){
                result.push(data)
            }
        })
        return result
    })
    App.Bind("Init", "info.items.loaditems")
})(App)