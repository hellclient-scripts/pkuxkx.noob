(function(App){
    App.RegisterAssistant("fullme","Fullme",App.Core.CaptchaFullme,20)
    App.RegisterAssistant("showfullme","显示验证码",App.Core.CaptchaShowFullme,20)
})(App)