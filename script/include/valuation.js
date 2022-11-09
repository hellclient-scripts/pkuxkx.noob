(function () {
    let Action = Include("include/action.js")
    let Valuation = function (strategy) {
        this.Weight = null
        this.Strategy = strategy || ""
        this.Treasure = null
        this.Actions = []
        this.Keeper = null
    }
    Valuation.prototype.GetPreset = function () {
        for (var i = 0; i < this.Actions.length; i++) {
            let action = this.Actions[i]
            if (action.Command == "") {
                return action.Data
            }
        }
        return ""
    }
    Valuation.prototype.Load = function () {
        for (var i = 0; i < this.Actions.length; i++) {
            let action = this.Actions[i]
            if (action.Strategy == this.Strategy || action.Strategy == "") {
                switch (action.Command) {
                    case "#weight":
                        if (this.Weight === null) {
                            this.Weight = action.Data - 0
                        }
                        break
                    case "#treasure":
                        if (this.Treasure === null) {
                            this.Treasure = []
                            let data = action.Data.split(",")
                            for (var i = 0; i < data.length; i++) {
                                let t = data[i].trim()
                                if (t) {
                                    this.Treasure.push(t)
                                }
                            }
                        }
                        break
                    case "#keeper":
                        if (this.Keeper === null) {
                            this.Keeper = action.Data
                        }
                        break
                }
                if (this.Weight!==null && this.Treasure!==null &&this.Keeper!==null){
                    return
                }
            }
        }
        if (this.Weight===null){
            this.Weight=0
        }
        if (this.Treasure===null){
            this.Treasure=[]
        }
        if (this.Keeper===null){
            this.Keeper=""
        }
    }
    return Valuation
})()