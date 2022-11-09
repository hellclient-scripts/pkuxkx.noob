(function(){
    let Asset=function(){
        this.Name=""
        this.ID=""
        this.Type={}
        this.Level=-1
        this.Grade=-1
        this.Hole=-1
        this.Value=-1
        this.Binded=false
        this.Identified=-1
        this.Effect={}
        this.StoreType=""
        this.SellType=""
    }
    Asset.prototype.AddType=function(t){
        this.Type[t]=true
    }
    Asset.prototype.AddTypes=function(types){
        for (var i=0;i<types.length;i++){
            this.Type[types[i]]=true
        }
    }
    return Asset
})()