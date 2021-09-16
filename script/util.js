var Now=function(){
    return (new Date()).getTime()
}
var After=function(time,duration){
    if (!time){
        return true
    }
    if (duration){
        time=time+duration
    }
    return Now()>time
}
var Before=function(time,duration){
    if (!time){
        return fale
    }
    if (duration){
        time=time-duration
    }
    return Now()<time
}
var CNumber={
    re:new RegExp("(((零|一|二|三|四|五|六|七|八|九|十|百|千|万)*)(支|顶|块|朵|面|匹|位|支|颗|个|把|只|粒|张|枚|件|柄|根|块|文|两|碗|滴|岁)){0,1}(.*)"),
    list:"零一二三四五六七八九",
    Convert:function(str){
        var result=0
        var target=str.split("")
        var wan=1
        var unit=1
        while (target.length>0){
            var char=target.splice(-1)
            if (char=="十"){
                    unit=10*wan
                    if (target.length==0){
                        result+=unit
                    }else if(CNumber.list.indexOf(target[target.length-1])<0){
                        result+=unit
                    }
            }else if (char=="百"){
                    unit=100*wan
            }else if (char=="千"){
                    unit=1000*wan
            }else if (char=="万"){
                    unit=1000*wan
                    wan=10000
            }else{
                    var val=CNumber.list.indexOf(char)
                    result+=val*unit
            }
        }
        return result
    },
    Split:function(str){
        var result=str.match(CNumber.re)
        var count=result[2]?result[2]:""
        var unit=result[4]?result[4]:""
        var item=result[5]
        return{
            Count:CNumber.Convert(count),
            Unut:unit,
            Item:item
        }
    }
}

var Directive
(function(){
    let re=/^(\S*)( (.*)){0,1}$/
    Directive=function(str){
        let result=str.match(re)
        if (result==null){
            this.Command=str
            this.Data=""
            return
        }
        this.Command=result[1]||""
        this.Data=result[3]||""
    }
})()

var Pipe
(function(){
    let re=/^([^|]*)(\|(.*)){0,1}$/
    Pipe=function(str){
        let result=str.match(re)
        if (result==null){
            this.Command=str
            this.Next=""
            return
        }
        this.Command=result[1]||""
        this.Next=result[3]||""
    }
})()

var CloneArray=function (data,skipempty) {
    let result=[]
    for(let i=0;i<data.length;i++){
        if (!skipempty || data[i]){
            result.push(data[i])
        }
    }
    return result
}