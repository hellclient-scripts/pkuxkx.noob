(function(app){
    let imgsrcre=/<img src="\.([^"]+)"/
    app.Data.FullmeCallback=""
    app.Data.FullmeUrl=""
    app.Data.FullmeUrls={} 

    app.API.Fullme=function(callback){
        let url=app.Data.FullmeUrl
        if (url){
            app.Core.FullmeLoadHTML(url,callback)
        }
    }
    app.Core.FullmeLoadHTML=function(htmlurl,callback){
        app.Data.FullmeCallback=callback?callback:""
        Request("fullme",htmlurl)
        app.Core.FullmeReq=HTTP.New("GET",htmlurl)
        app.Core.FullmeReq.AsyncExecute("App.Core.OnFullme")
    }
    app.Core.FullmeUrlByKey=function(key,callback){
        let url=app.Data.FullmeUrls[key]
        app.Data.FullmeUrl=url
        app.Core.FullmeLoadHTML(url,callback)
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
    app.Core.OnFullmeURL=function(name, output, wildcards){
        app.Data.FullmeUrl=wildcards[0]
    }
    app.Core.OnFullmeGonghao=function(name, output, wildcards){
        app.Data.FullmeUrls.gonghao=app.Data.FullmeUrl
    }
    app.Core.OnFullmeCmd=function(name, output, wildcards){
        app.Data.FullmeUrls.fullme=app.Data.FullmeUrl
    }
    app.Core.OnFullmeURLFail=function(name, output, wildcards){
        app.Data.FullmeUrl=""
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
    app.Core.DoFullme=function(){
        app.Send("fullme")
        app.Response("core","fullmeprompt")
    }
    app.RegisterCallback("core.fullmeprompt",function(){
        world.Note("show fullme")
        app.API.Fullme("core.fullme.send")
    })
    app.Bind("Response.core.fullmeprompt","core.fullmeprompt")
    app.Core.ResponseFullme=function(msgtype,id,data){
        let result=data.split("|")
        if (result.length!=2){
            return
        }
        if (app.Data.FullmeUrls.gonghao==result[1]){
            Userinput.hideall()
            app.Send("report "+result[0])
        }
    }
})(App)