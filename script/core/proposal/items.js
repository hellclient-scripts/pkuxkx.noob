(function (App) {
    let proposal = Include("core/proposal/proposal.js")
    let GetItmes = function () {
        let result = []
        let items = GetVariable("item_list").trim()
        if (items != "") {
            let itemlist = items.split("\n")
            for (var i = 0; i < itemlist.length; i++) {
                if (itemlist[i] != "") {
                    let item = itemlist[i].split("::")
                    if (item.length == 1) {
                        item.push(1)
                    }
                    result.push({ ID: item[0], Count: item[1] - 0 })
                }
            }
        }
        return result
    }
    let Items = function () {
        proposal.call(this, "items")
        this.Submit = function () {
            let items = GetItmes()
            for (var i = 0; i < items.length; i++) {
                if (App.GetItemNumber(App.API.GetItem(items[i].ID).Name, true) + App.GetLupiDaiItemNumber(items[i].ID, true) < items[i].Count) {
                    return true
                }
            }
            return false
        }
        this.Execute = function () {
            let items = GetItmes()
            for (var i = 0; i < items.length; i++) {
                if (App.GetItemNumber(App.API.GetItem(items[i].ID).Name, true) + App.GetLupiDaiItemNumber(items[i].ID, true) < items[i].Count) {
                    App.Produce(items[i].ID, items[i].Count)
                    return
                }
            }
        }
    }
    App.RegisterProposal(new Items())
})(App)