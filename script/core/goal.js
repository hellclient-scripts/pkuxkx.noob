(function (App) {
    var Goal = function (target) {
        this.Type = ""
        this.Target = target ? target : ""
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
    Goal.prototype.Check = function () {
        if (this.Found) {
            return
        }
        switch (this.Type) {
            case "room":
                this.Found = (App.Data.Room.Name == this.Target)
                break
            case "objid":
                this.Found=App.HasRoomObj(this.Target,true)
                break
            case "objname":
                this.Found=App.HasRoomObjName(this.Target)
                break
            case "desc":
                this.Found = (App.Data.Room.Desc.indexOf(this.Target) >= 0)
                break
            case "known":
                this.Found=(App.Data.Room.ID!="")
        }
    }
    return Goal
})(App)