(function(){
    let Active=function(location,cmd,final,nobusy){
        this.Location=location
        this.Command=cmd?cmd:""
        this.FinalState=final?final:""
        this.Nobusy=nobusy?true:false
    }
    return Active
})()