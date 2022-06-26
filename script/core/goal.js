(function (App) {
    var Goal = function (target) {
        this.Type = ""
        if(!target){
            target=""
        }
        this.Target = target.split("||")
        this.Found = false
    }
    Goal.prototype.FindRoom = function () {
        this.Type = "room"
        return this
    }
    Goal.prototype.FindObjID = function () {
        this.Type = "objid"
        return this
    }
    Goal.prototype.FindObjName = function () {
        this.Type = "objname"
        return this
    }
    Goal.prototype.FindDesc = function () {
        this.Type = "desc"
        return this
    }
    Goal.prototype.FindKnownRoom = function () {
        this.Type = "known"
        return this
    }
    Goal.prototype.FindRedBG = function () {
        this.Type = "redbg"
        return this
    }
    Goal.prototype.CheckTarget=function(target){
        if (this.Found) {
            return
        }
        switch (this.Type) {
            case "room":
                this.Found = (App.Data.Room.Name == target)
                break
            case "objid":
                this.Found=App.HasRoomObj(target,true)
                break
            case "objname":
                this.Found=App.HasRoomObjName(target)
                break
            case "desc":
                this.Found = (App.Core.RoomDesc.Desc.indexOf(target) >= 0)
                break
            case "known":
                this.Found=(App.Data.Room.ID!="")
                break
            case "redbg":
                this.Found=(App.Core.RedBGExits.length!=0)
                break
        }
    }
    Goal.prototype.Check = function () {
        for (let i=0;i<this.Target.length;i++){
            if (this.Found) {
                return
            }
            this.CheckTarget(this.Target[i])
        }
    }
    return Goal
})(App)