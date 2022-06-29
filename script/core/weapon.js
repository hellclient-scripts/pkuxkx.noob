(function(App){
    App.Core.Weapon={}
    let weaponsre=/[,\n]/
    App.Core.Weapon.ReWield=function(){
        App.Send("unwield all")
        App.Core.Weapon.Wield()
    }
    App.Core.Weapon.Wield=function(){
        let weapons=world.GetVariable("weapons").trim()
        weapons.split(weaponsre).forEach(function(weapon){
            weapon=weapon.trim()
            if (weapon){
                App.Send("wield "+weapon+" on right")
            }
        })
        weapons=world.GetVariable("weapons_left").trim()
        weapons.split(weaponsre).forEach(function(weapon){
            weapon=weapon.trim()
            if (weapon){
                App.Send("wield "+weapon+" on right")
            }
        })

    }

}(App))