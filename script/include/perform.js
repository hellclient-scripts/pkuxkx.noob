(function () {
    const CommadTypeSend = 0
    const CommadTypeUse = 1
    let Perform = function (id, tri) {
        this.ID = id
        this.Commands = []
        this.Group = ""
        this.Cooldown = tri?5:0
        this.Before = ""
        this.After = ""
        this.Triggers = []
        this.Weapon = ""
        this.WeaponCooldown = 0
        if (tri) {
            this.AddTrigger(tri, 0)
        }
    }
    Perform.prototype.SetWeapon = function (type, cooldown) {
        this.Weapon = type
        this.WeaponCooldown = cooldown ? cooldown : 0
    }
    Perform.prototype.AddTrigger = function (tri, cooldown) {
        this.Triggers.push({
            Trigger: tri,
            Cooldown: cooldown ? cooldown : 0
        })
    }
    Perform.prototype.AddUse = function (id, type) {
        this.Commands.push({
            CommandType: CommadTypeUse,
            ID: id,
            Type: type,
        })
    }
    Perform.prototype.AddCommand = function (cmd, ontarget) {
        this.Commands.push({
            CommandType: CommadTypeSend,
            Command: cmd,
            OnTarget: ontarget,
        })
    }
    Perform.prototype.CaclCooldown = function (line) {
        for (var i = 0; i < this.Triggers.length; i++) {
            if (line.match(this.Triggers[i].Trigger)) {
                if (this.WeaponCooldown) {
                    Note("Perform成功，锁定武器 " + this.Weapon + " " + this.WeaponCooldown + "秒")
                    App.Core.Combat.Current.WeaponCooldown = this.WeaponCooldown
                }
                return this.Triggers[i].Cooldown
            }
        }
        return -1
    }
    Perform.prototype.Execute = function (target) {
        if (this.Weapon) {
            App.Core.Combat.Current.Weapon = this.Weapon
            App.Core.Weapon.UseRight(this.Weapon)
            App.Core.Combat.Current.WeaponCooldown=1
        }
        for (var i = 0; i < this.Commands.length; i++) {
            let command = this.Commands[i]
            switch (command.CommandType) {
                case CommadTypeUse:
                    App.Core.Weapon.Use(command.ID, command.Type)
                    break
                default:
                    if (command.OnTarget) {
                        if (target) {
                            App.Send(command.Command.replace("$1", target))
                        }
                    } else {
                        App.Send(command.Command.replace("$1", target))
                    }
            }
        }
    }
    return Perform
})()