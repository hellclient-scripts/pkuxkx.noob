(function(App){
    App.AuthCheck=function(){
        return (world.CheckPermissions(["http"])&& world.CheckTrustedDomains(["fullme.pkuxkx.net"]))
    }
    App.Auth=function(success,script){
        if (!script){
            script=""
        }
        if (!success){
            success=""
        }
        if (!world.CheckPermissions(["http"])){
            world.RequestPermissions(["http"],"申请HTTP权限用于显示验证码",script)
            return
        }
        if (!world.CheckTrustedDomains(["fullme.pkuxkx.net"])){
            world.RequestTrustDomains(["fullme.pkuxkx.net"],"申请信任Fulleme网址用于显示验证码",script)
            return
        }
        App.ExecuteCallback(success)
    }
})(App)