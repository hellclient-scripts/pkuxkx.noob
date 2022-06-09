(function(){
    let Question=function(npc,question,length){
        this.NPC=npc
        this.Question=question
        this.Length=length?length:1
    }
    return Question
})()