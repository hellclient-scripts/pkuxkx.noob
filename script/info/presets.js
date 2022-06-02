(function (App) {
    App.Info.BuiltinPresetsLabels=[]

    App.Info.BuiltinPresets={}

    App.RegisterCallback("info.presets.loadpresets", function () {
        world.Note("加载预设")
        let data=world.ReadFile("info/data/presets.json")
        let presets = JSON.parse(data)
        presets.forEach(preset => {
            App.Info.BuiltinPresetsLabels.push(preset.label)
            App.Info.BuiltinPresets[preset.label]=preset
        });
    })
    App.Bind("Init", "info.presets.loadpresets")

})(App)