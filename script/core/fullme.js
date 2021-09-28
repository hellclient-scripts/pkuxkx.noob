(function(app){
    let imgsrcre=/<img src="\.([^"]+)"/
    app.Data.FullmeCallback=""
    app.API.Fullme=function(callback){
        let url=app.Core.FullmeUrl
        if (url){
            app.Data.FullmeCallback=callback?callback:""
            app.Core.FullmeReq=HTTP.New("GET",url)
            app.Core.FullmeReq.AsyncExecute("App.Core.OnFullme")
        }
    }
    app.Core.FullmeReq=null
    app.Core.OnFullme=function(name,id,code,data){
        if (code!=0){
            throw data
        }
        if (code==0){
            let result=imgsrcre.exec(app.Core.FullmeReq.ResponseBody())
            if (result==null){
                throw "无法匹配图片地址"
            }
            let url="http://fullme.pkuxkx.net"+result[1]
            app.API.ShowFullme(url)
        }
    }
    app.Core.OnFullmeRefresh=function(name,id,code,data){
        if (code==0){
            app.API.Fullme(app.Data.FullmeCallback)
        }
    }
    app.Core.FullmeUrl=""
    app.Core.OnFullmeURL=function(name, output, wildcards){
        app.Core.FullmeUrl=wildcards[0]
    }
    app.Core.OnFullmeSubmit=function(name,id,code,data){
        if (code==0 && data){
            let callback= app.Data.FullmeCallback
            app.Data.FullmeCallback=""
            app.ExecuteCallback(callback,data)
        }
    }
    app.API.ShowFullme=function(url){
        let vp=Userinput.newvisualprompt("验证码","忽略红色字符，如果是方向性文字，每对中括号内文字为一组",url)
        vp.setrefreshcallback("App.Core.OnFullmeRefresh")
        vp.publish("App.Core.OnFullmeSubmit")
    }
    app.RegisterCallback("core.fullme.send",function(data){
        app.Send("fullme "+data)
    })
    app.Fullme=function(){
        app.API.Fullme("core.fullme.send")
    }
})(App)