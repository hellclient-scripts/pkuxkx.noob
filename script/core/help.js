(function (App) {
    App.Core.Help={}
    App.Core.Help.Show=function(file){
        let body=ReadFile(file)
        Userinput.Note("App.Core.Help.OnLink","帮助",body,"md")
    }
    App.Core.Help.OnLink=function(name, id, code, data){
        if (code==0&&data){
            if (HasFile("doc/"+data)){
                App.Core.Help.Show("doc/"+data)
            }
        }
    }
    App.Help=function(){
        App.Core.Help.Show("doc/index.md")   
    }
    Userinput.Popup("App.Help", "欢迎使用", "点击查看使用帮助","info")

})(App)