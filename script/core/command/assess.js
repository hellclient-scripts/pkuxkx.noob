(function(App){
    App.Core.Assess={}

    App.Core.Assess.LoadActions=function(data){
        let lines=data.split("\n")
        let result=[]
        for(var i=0;i<lines.length;i++){
            let line=lines[i].trim()
            if (line){
                let action=new Action(line)
                    result.push(action)
                }
            }
            return action
    }
    let autoactions=[
        "#dang type=set",
        "#dang id=pro book",
        "slot 1,quality 4>#dang type=zhiye",
        "!slot 2>#sell type=random",
        "!slot 2>#sell type=zhiye",
        "#sell.5 xue jiedan",
        "quit:#sell xue jiedan",
        "relogin:#sell xue jiedan",
        "#pack type=gem",
        "#sell nen cao,sui rouxie",
        "quit:#sell wushi dao,dulong bian",
        "#drop shi tan,xuan bing,"
    ].join("\n")
})(App)