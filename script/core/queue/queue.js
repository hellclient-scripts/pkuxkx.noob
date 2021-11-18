(function(){
    let Queue=function(queue){
        this.Queue=CloneArray(queue, true)
        this.Remain=CloneArray(queue, true)
    }
    return Queue
})()