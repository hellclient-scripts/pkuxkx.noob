(function(){
    let AssetFilter=function(line){
        this.Filters=[]
        let data=line.split("&")
        for (var i=0;i<data.length;i++){
            let filter={
                Type:"",
                Data:[],
            }
            let filterdata=data[i].split("=")
            if (filterdata.length<2){
                filterdata=["",filterdata[0]]
            }
            filter.Type=filterdata[0].trim()
            let list=filterdata[1].split(",")
            for (var k=0;k<list.length;k++){
                let f=list[k].trim()
                if (f){
                    filter.Data.push(f)
                }
            }
            this.Filters.push(filter)
        }
    }
    let DoFilter=function(filter,asset){
        switch(filter.Type){
            case "":
            case "id":
                for (var k=0;k<filter.Data.length;k++){
                    if (filter.Data[k].toLowerCase()==asset.ID.toLowerCase()){
                        return true
                    }
                }
                return false
            case "name":
                for (var k=0;k<filter.Data.length;k++){
                    if (filter.Data[k]==asset.Name){
                        return true
                    }
                }
                return false
            case "type":
                for (var k=0;k<filter.Data.length;k++){
                    if (asset.Type[filter.Data[k]]){
                        return true
                    }
                }
                return false
        }
    }
    AssetFilter.prototype.Filter=function(asset){
        if (this.Filters.length==0){
            return false
        } 
        for(var i=0;i<this.Filters.length;i++){
            let filter=this.Filters[i]
            if (!DoFilter(filter,asset)){
                return false
            }
        }
        return true
    }
    return AssetFilter
})()