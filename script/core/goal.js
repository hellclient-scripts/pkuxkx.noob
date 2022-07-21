(function (App) {
    var Goal = function (target) {
        this.Type = ""
        if (!target) {
            target = ""
        }
        this.State = ""
        this.Target = target.split("||")
        this.Skipped=false
        this.Found = false
    }
    Goal.prototype.Skip=function(){
        this.Skipped=true
        this.Found=false
    }
    Goal.prototype.FindRoom = function () {
        this.Type = "room"
        this.State = ""
        return this
    }
    Goal.prototype.FindObjID = function () {
        this.Type = "objid"
        this.State = ""
        return this
    }
    Goal.prototype.FindObjName = function () {
        this.Type = "objname"
        this.State = ""
        return this
    }
    Goal.prototype.FindDesc = function () {
        this.Type = "desc"
        this.State = ""
        return this
    }
    Goal.prototype.FindKnownRoom = function () {
        this.Type = "known"
        this.State = ""
        return this
    }
    Goal.prototype.FindRedBG = function () {
        this.Type = "redbg"
        this.State = ""
        return this
    }
    Goal.prototype.FindCustom = function () {
        this.Type = "custom"
        this.State = ""
        return this
    }
    Goal.prototype.FindHerb = function () {
        this.Type = "herb"
        this.State = "core.state.traversal.look"
        return this
    }
    Goal.prototype.CheckTarget = function (target) {
        if (this.Found) {
            return
        }
        switch (this.Type) {
            case "custom":
                break
            case "room":
                this.Found = (App.Data.Room.Name == target)
                break
            case "objid":
                this.Found = App.HasRoomObj(target, true)
                break
            case "objname":
                this.Found = App.HasRoomObjName(target)
                break
            case "desc":
                this.Found = (App.Core.RoomDesc.Desc.indexOf(target) >= 0)
                break
            case "known":
                this.Found = (App.Data.Room.ID != "")
                break
            case "redbg":
                if (target != "*" && target != App.Data.Room.Name) {
                    return
                }
                this.Found = (App.Core.RedBGExits.length != 0)
                break
            case "herb":
                this.Found = App.Data.Room.HasHerb
                break
        }
    }
    Goal.prototype.Check = function () {
        if (this.Skipped){
            this.Skipped=false
            return
        }
        for (let i = 0; i < this.Target.length; i++) {
            if (this.Found) {
                return
            }
            this.CheckTarget(this.Target[i])
        }
    }
    return Goal
})(App)