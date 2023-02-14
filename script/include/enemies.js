(function () {
    let Enemies = function () {
        this.Reset()
    }
    Enemies.prototype.Reset = function () {
        this.Tags = {}
        this.List = []
        this.IDList = []
        this._count = {}
        this._needLook = true
        this._notLooked = 0
    }
    Enemies.prototype.ListTags = function (count) {
        let result = []
        for (var i = 0; i < this.List.length; i++) {
            if (count <= 0) {
                break
            }
            count--
            let obj = this.List[i]
            if (this.Tags[obj.Dump]) {
                result.push({
                    Name: obj.Name,
                    Tags: Object.keys(this.Tags[obj.Dump]),
                })
            }
        }
        return result
    }
    Enemies.prototype.FormatID = function (max) {
        let result = []
        let more = max > this.IDList.length
        for (var i = 0; i < this.IDList.length && i < max; i++) {
            result.push(this.IDList[i].Key)
        }
        let output = result.join(",")
        if (more) {
            output = output + " + "
        }
        return output
    }
    Enemies.prototype.SetTag = function (dump, tags) {
        if (this.Tags[dump] == undefined) {
            this.Tags[dump] = {}
            this.NeedLook = true
        }
        for (var i = 0; i < tags.length; i++) {
            this.Tags[dump][tags[i]] = true
        }
    }
    Enemies.prototype.push = function (dump, name, id) {
        if (!this._count[id]) {
            this._count[id] = 0
        }
        this._count[id]++
        this.List.push({
            "Dump": dump,
            "Name": name,
            "ID": id + " " + this._count[id]
        })
    }
    let re = /^([一二三四五六七八九十百千万]+)位(.+)$/
    Enemies.prototype.Update = function (objlist) {
        this._count = {}
        this.List = []
        for (var i = 0; i < objlist.length; i++) {
            let obj = objlist[i]
            let count = 1
            let name = obj.Last
            let dump = obj.LastDump
            let result = obj.Last.match(re)
            if (result) {
                name = result[2]
                let rawdump = JSON.parse(obj.LastDump).slice(-name.length)
                dump = JSON.stringify(rawdump)
                count = CNumber.Convert(result[1])
                if (!count) {
                    count = 1
                }
            }
            for (var j = 0; j < count; j++) {
                this.push(dump, name, obj.ID.toLowerCase())
            }
        }
        this._needLook = false
        this._notLooked = 0
    }
    Enemies.prototype.CheckNeedLook = function (max) {
        this._notLooked++
        return this._needLook || this._notLooked > max
    }
    Enemies.prototype.Get = function (taglist) {
        if (!taglist) {
            taglist = []
        }
        for (var i = 0; i < taglist.length; i++) {
            let obj = this._getByTag(taglist[i])
            if (obj) {
                return obj.ID
            }
        }
        if (this.IDList.length) {
            return this.IDList[0].ID
        }
        return ""
    }
    Enemies.prototype._getByTag = function (tag) {
        for (var i = 0; i < this.List.length; i++) {
            let obj = this.List[i]
            if (this.Tags[obj.Dump] && this.Tags[obj.Dump][tag]) {
                return obj
            }
        }
        return null
    }
    Enemies.prototype.InsertID = function (key, id) {
        for (var i = 0; i < this.IDList.length; i++) {
            let item = this.IDList[i]
            if (item.Key == key) {
                return
            }
        }
        Note("发现敌人:" + id)
        this.IDList.push({
            Key: key,
            ID: id
        })
    }
    Enemies.prototype.RemoveID = function (key, id) {
        for (var i = 0; i < this.IDList.length; i++) {
            let item = this.IDList[i]
            if (item.Key == key) {
                Note("失去敌人:" + id)
                this.IDList.splice(i)
                return
            }
        }
    }
    return Enemies

})()