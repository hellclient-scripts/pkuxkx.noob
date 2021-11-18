(function (app) {
    let prepare=Include("include/prepare.js")

    app.Proposals = {}
    app.ProposalGroups = {}
    app.RegisterProposal = function (proposal) {
        if (proposal.ID == "") {
            throw "Proposal id不可为空"
        }
        app.Proposals[proposal.ID] = proposal
    }
    app.RegisterProposalGroup = function (groupid, proposals) {
        app.ProposalGroups[groupid] = proposals
    }

    let try_proposals = function (proposals) {
        for (var i in proposals) {
            let proposal = app.Proposals[proposals[i]]
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
        let group = app.ProposalGroups[groupid]
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
    app.TryProposalGroups = function (groups) {
        return try_proposalgroups(groups)
    }
    app.TryProposalGroup = function (groupid) {
        return try_proposalgroup(groupid)
    }
    app.TryProposals = function (proposals) {
        return try_proposals(proposals)
    }
    app.NewPrepare=function(level,items,group){
        return new prepare(level,items,group)
    }
    app.StartFullPrepare=function(final){
        this.NewPrepare(app.CheckLevelFull,["prepare"],true).Start(final)
    }
    Include("core/proposal/cash.js")
    Include("core/proposal/food.js")
    Include("core/proposal/drink.js")
    Include("core/proposal/prepare.js")
    app.RegisterState(new (Include("core/state/prepare/preparecheck.js"))())
    app.RegisterState(new (Include("core/state/prepare/prepareconfirm.js"))())
})(App)