(function (app) {
    app.Info.BuiltinPresetsLabels=[]

    app.Info.BuiltinPresets={}

    app.RegisterCallback("info.presets.loadpresets", function () {
        world.Note("加载预设")
        let data=world.ReadFile("info/data/presets.json")
        let presets = JSON.parse(data)
        presets.forEach(preset => {
            app.Info.BuiltinPresetsLabels.push(preset.label)
            app.Info.BuiltinPresets[preset.label]=preset
        });
    })
    app.Bind("Ready", "info.presets.loadpresets")

})(App)