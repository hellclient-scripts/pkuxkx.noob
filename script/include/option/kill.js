(function(App){
    let Kill=function(cmd,type,before,after){
        this.Cmd=cmd
        this.Type=type
        this.Before=before
        this.After=after
        this.Online=null
        this.OnNpcFlee=null
    }
    return Kill
})(App)