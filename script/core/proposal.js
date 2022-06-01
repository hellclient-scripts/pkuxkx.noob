(function (app) {
    let prepare=Include("include/prepare.js")

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

    let try_proposals = function (proposals) {
        for (var i in proposals) {
            let proposal = App.Proposals[proposals[i]]
            if (!proposal) {
                throw "提案 [" + proposals[i] + "] 没找到"
            }
            if (proposal.Submit()) {
                return proposal
            }
        }
        return null
    }
    let try_proposalgroup = function (groupid) {
        let group = App.ProposalGroups[groupid]
        if (!group) {
            throw "提案组 [" + groupid + "] 没找到"
        }
        return try_proposals(group)

    }
    let try_proposalgroups = function (groups) {
        for (var i in groups) {
            let group=groups[i]
            let p=try_proposalgroup(group)
            if (p){
                return p
            }
        }
        return null
    }
    App.TryProposalGroups = function (groups) {
        return try_proposalgroups(groups)
    }
    App.TryProposalGroup = function (groupid) {
        return try_proposalgroup(groupid)
    }
    App.TryProposals = function (proposals) {
        return try_proposals(proposals)
    }
    App.NewPrepare=function(level,items,group){
        return new prepare(level,items,group)
    }
    App.StartFullPrepare=function(final){
        this.NewPrepare(App.CheckLevelFull,["prepare"],true).Start(final)
    }
    Include("core/proposal/cash.js")
    Include("core/proposal/food.js")
    Include("core/proposal/drink.js")
    Include("core/proposal/prepare.js")
    App.RegisterState(new (Include("core/state/prepare/preparecheck.js"))())
    App.RegisterState(new (Include("core/state/prepare/prepareconfirm.js"))())
})(App)