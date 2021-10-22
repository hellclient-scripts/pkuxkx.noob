(function (app) {
    let basicstate = Include("core/state/basicstate.js")
    let StateShop=function(){
        basicstate.call(this)
        this.ID="shopping"
    }
    StateShop.prototype = Object.create(basicstate.prototype)
    StateShop.prototype.Enter=function(Context,newstatue){
    }
    StateShop.prototype.OnEvent=function(context,event,data){
    }
    return StateShop
})(App)