(function (App) {
    App.Core.Notify={};
    App.Core.Notify.TPush={};
    App.Core.Notify.TPush.APIServer='api.tpns.sh.tencent.com/v3/push/app';
    App.Core.Notify.TPush.Auth=function(success,script){
        if (!script){
            script=""
        }
        if (!success){
            success=""
        }
        if (!world.CheckPermissions(["http"])){
            world.RequestPermissions(["http"],"申请HTTP权限用发送腾讯推送通知",script)
            return
        }
        if (!world.CheckTrustedDomains(["api.tpns.sh.tencent.com"])){
            world.RequestTrustDomains(["api.tpns.sh.tencent.com"],"申请信任腾讯云api",script)
            return
        }
        App.ExecuteCallback(success)
    }
    App.Core.Notify.TPush.SendAndroid=function(appid,appkey,token,title,content,server,game){
        var body={
            "audience_type":"token",
            "token_list":[token],
            "message_type":"notify",
            "message":{
                "title":title,
                "content":content,
                "android":{
                    "vibrate":1,
                    "lights":1,
                    "action":{
                        "action_type":3,
                        "intent":"hcnotify://hellclient.jarlyyn.com/notify/"+server+"#"+game,
                    }
                }
            }
        }
        api='https://'+appid+':'+appkey+"@"+App.Core.Notify.TPush.APIServer;
        App.Core.Notify.TPush.Req = HTTP.New("POST", api)
        App.Core.Notify.TPush.Req.SetBody(JSON.stringify(body))
        Note(JSON.stringify(body));
        Note("正在发送推送")
        App.Core.Notify.TPush.Req.AsyncExecute('App.Core.Notify.TPush.Callback')
    }
    App.Core.Notify.TPush.Callback=function(){
        let resp=App.Core.Notify.TPush.Req.ResponseBody();
        let data=JSON.parse(resp);
        if (data.ret_code==0){
            Note('推送成功')
        }else{
            Note(resp)
        }
    }
})(App)