(function (App) {
    App.Proposals = {}
    App.ProposalGroups = {}
    App.RegisterProposal = function (proposal) {
        if (proposal.ID == "") {
            throw "Proposal id不可为空"
        }
        App.Proposals[proposal.ID] = proposal
    }
    App.RegisterProposalGroup = function (groupid, proposals) {
        App.ProposalGroups[groupid] = proposals
    }

    let try_proposals = function (proposals,excluded_map) {
        for (var i in proposals) {
            if (excluded_map&&excluded_map[proposals[i]]){
                continue
            }
            let proposal = App.Proposals[proposals[i]]
            if (!proposal) {
                throw "提案 [" + proposals[i] + "] 没找到"
            }
            if (proposal.Submit()) {
                Note("提案"+proposal.ID+"被接受")
                return proposal
            }
        }
        return null
    }
    let try_proposalgroup = function (groupid,excluded_map) {
        let group = App.ProposalGroups[groupid]
        if (!group) {
            throw "提案组 [" + groupid + "] 没找到"
        }
        return try_proposals(group,excluded_map)

    }
    let try_proposalgroups = function (groups,excluded_map) {
        for (var i in groups) {
            let group=groups[i]
            let p=try_proposalgroup(group,excluded_map)
            if (p){
                return p
            }
        }
        return null
    }
    App.TryProposalGroups = function (groups,excluded_list) {
        return try_proposalgroups(groups,excluded_list)
    }
    App.TryProposalGroup = function (groupid) {
        return try_proposalgroup(groupid)
    }
    App.TryProposals = function (proposals,excluded_list) {
        return try_proposals(proposals,excluded_list)
    }
    App.PrapareFull=App.Options.NewPrepare(App.CheckLevelFull,["prepare"],true)
    App.PrapareFullExcept=function(excepted){
        let m={}
        if (excepted){
            for (var i=0;i<excepted.length;i++){
                m[excepted[i]]=true
            }
        }
        return App.Options.NewPrepare(App.CheckLevelFull,["prepare"],true,m)
    }
    
    Include("core/proposal/cash.js")
    Include("core/proposal/food.js")
    Include("core/proposal/drink.js")
    Include("core/proposal/items.js")
    Include("core/proposal/neili.js")
    Include("core/proposal/heal.js")
    Include("core/proposal/sell.js")
    Include("core/proposal/cun.js")
    Include("core/proposal/repair.js")
    Include("core/proposal/prepare.js")
    Include("core/proposal/poison.js")
    Include("core/proposal/lupidai.js")
    Include("core/proposal/baofu.js")
    Include("core/proposal/asset.js")
    Include("core/proposal/throwing.js")
    Include("core/proposal/coin.js")
    Include("core/proposal/silver.js")
    Include("core/proposal/toggle.js")
    Include("core/proposal/zhenqi.js")
    Include("core/proposal/shaqi.js")
    Include("core/proposal/overheat.js")
    App.RegisterState(new (Include("core/state/prepare/preparecheck.js"))())
    App.RegisterState(new (Include("core/state/prepare/prepareconfirm.js"))())
})(App)