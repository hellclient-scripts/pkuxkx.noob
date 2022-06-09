(function(App){
    let walkpath=Include("include/option/walkpath.js")
    
    App.Options={}
    App.Options.NewWalkpath=function(target,vehicle){
        return new walkpath(target,vehicle)
    }
}(App))