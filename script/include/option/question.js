(function(){
    let Question=function(npc,question,length){
        this.NPC=npc
        this.Question=question
        //注意，length小于0时，问题会持续记录，但流程会相下走，不会卡住，即动态长度
        this.Length=length?length:1
    }
    return Question
})()