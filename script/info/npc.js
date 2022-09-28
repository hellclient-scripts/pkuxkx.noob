(function (App) {
    App.Info.NPCs = {}
    let NPC = Include("include/npc.js")
    App.Info.LoadNPCLines = function (lines) {
        lines.forEach(function (line) {
            if (line.trim() == "" || line.slice(0, 2) == "//") {
                return
            }
            let data = line.split("||")
            if (data.length < 5) {
                throw "NPC [" + line + "]格式错误"
            }
            let npc = new NPC()
            npc.ID = data[0]
            npc.Name = data[1]
            npc.Label = data[2]
            npc.Type = data[3]
            npc.Location = data[4]
            if (data.length > 5) {
                npc.Exp = data[5] - 0
            }
            if (data.length > 6) {
                npc.Tags = data[6].split(",")
            }
            if (data.length > 7) {
                npc.Comment = data[7]
            }
            App.Info.NPCs[npc.ID] = npc
        })
    }
    App.Info.FindNPCByLabel = function (label) {
        for (var id in App.Info.NPCs) {
            if (App.Info.NPCs[id].Label == label) {
                return App.Info.NPCs[id]
            }
        }
    }
    App.RegisterCallback("info.presets.loadnpcs", function () {
        world.Note("加载NPC")
        let data = world.ReadLines("info/data/npcs.txt")
        App.Info.LoadNPCLines(data)
    })
    App.Bind("Init", "info.presets.loadnpcs")

})(App)