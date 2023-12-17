(function (App) {
    const duration = 5 * 60 * 1000;
    App.Core.Notify = {}
    App.Core.Notify.WaitManual = false
    App.Core.Notify.last = {}
    App.Notify = function (title, content, key) {
        if (key) {
            if (App.Core.Notify.last[key] && (Now() - App.Core.Notify.last[key]) < duration) {
                return;
            }
            App.Core.Notify.last[key] = Now();
            Broadcast('notified ' + key, false);
        }
        push.Notify(title, content)

    }
    App.RegisterCallback('core.onnotified', function (msg) {
        let data = SplitN(msg, ' ', 2)
        if (data[0] == 'notified') {
            App.Core.Notify.last[data[1]] = Now();
        }
    })
    App.Bind('Broadcast', 'core.onnotified')

    App.RegisterCallback('core.notify.zhangsan', function () {
        App.Notify('zhangsan找', '快查看');
    })

    App.Bind('core.zhangsan', 'core.notify.zhangsan')
    App.RegisterCallback('core.notify.zhangsancoming', function () {
        if (App.Core.Notify.InSettings('zhangsan')) {
            App.Notify('zhangsan要来', '准备下');
        }
    })
    App.Bind('core.zhangsancoming', 'core.notify.zhangsancoming')

    App.RegisterCallback('core.notify.died', function () {
        App.Notify('出现意外停机', '需要检查');
    })
    App.Bind('UnexpectedDeath', 'core.notify.died')

    App.RegisterCallback('core.notify.topcmd', function () {
        App.Notify('进入受限模式', '请检查设置', 'topcmd');
    })
    App.Bind('core.topcmd', 'core.notify.topcmd')

    App.RegisterCallback('core.notify.captcha', function () {
        switch (App.Data.CaptchaCurrentType) {
            case "captcha":
            case "show":
                if (App.Core.Notify.InSettings('fullme')) {
                    App.Notify('需要验证', '需要输入验证码继续', 'captcha');
                }
                break;
            default:
                if (App.Core.Notify.InSettings('captcha')) {
                    App.Notify('需要验证', '需要输入验证码继续', 'captcha');
                }
        }

    })
    App.Bind('captcha', 'core.notify.captcha')

    App.RegisterCallback('core.notify.manual', function () {
        if (App.Core.Notify.WaitManual) {
            App.Core.Notify.Report();
        }
    })
    App.Core.Notify.Report = function () {
        App.Core.Notify.WaitManual = false;
        App.Notify('准备完毕', '等待下一步指令');
    }
    App.Core.Notify.Book = function () {
        Userinput.Popup("", "已预约", "进入手动状态会进行通知", "info")
        App.Core.Notify.WaitManual = true;
    }
    App.Core.Notify.OnAliasBook = function (name, line, wildcards) {
        App.Core.Notify.Book()
        if (wildcards[1]) {
            Execute("#" + wildcards[1]);
        }
    }
    App.Bind('manual', 'core.notify.manual')

    App.Core.Notify.Show = function () {
        push.show();
    }
    App.Core.Notify.OnWaitManual = function () {
        App.Core.Notify.Book();
    }
    App.Core.Notify.Settings = function () {
        var list = Userinput.newlist("请选择你的通知设置", "选者你的通知设置", false)
        list.setmutli(true)
        list.append("captcha", "任务随机验证码提醒")
        list.append("fullme", "主动触发验证码(如fullme)提醒")
        list.append("zhangsan", "张三要来的提示")
        list.setvalues(GetVariable("notify_settings").split(","))
        list.publish("App.Core.Notify.SettingsCallback")
    }


    App.Core.Notify.SettingsCallback = function (name, id, code, data) {
        if (code == 0) {
            var list = JSON.parse(data)
            world.SetVariable("notify_settings", list.join(","))
        }
    }
    App.Core.Notify.InSettings = function (notifytype) {
        let items = GetVariable("notify_settings").split(",")
        for (var i = 0; i < items.length; i++) {
            if (notifytype == items[i]) {
                return true
            }
        }
        return false
    }
    App.RegisterAssistant("push", "推送管理", App.Core.Notify.Show, 9999)
    App.RegisterAssistant("waitmanual", "预约结束后通知", App.Core.Notify.OnWaitManual, 25)
    push.TPush.RegisterButton('settings', '通知类别设定', App.Core.Notify.Settings)
})(App)
