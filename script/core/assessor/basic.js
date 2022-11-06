(function(){
    let Assessor=Include("include/assessor.js")
    let Basic=function(){
        this.ID="basic"
    }
    Basic.prototype = Object.create(Assessor.prototype)
    Basic.prototype.Assess=function(obj,assessment){
        assessment.Name=obj.Name
        assessment.ID=obj.ID
    }
    return Basic
})()