(function (app) {

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
                proposal.Execute()
                return true
            }
        }
        return false
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
            if (try_proposalgroup(group)){
                return true
            }
        }
        return false
    }
    app.TryProposalGroups = function (groups) {
        if (try_proposalgroups(groups)) {
            return true
        }
        return false

    }
    app.TryProposalGroup = function (groupid) {
        if (try_proposalgroup(groupid)) {
            return true
        }
        return false
    }
    app.TryProposals = function (proposals) {
        if (try_proposals(proposals)) {
            return true
        }
        return false
    }

    Include("core/proposal/cash.js")
    Include("core/proposal/food.js")
    Include("core/proposal/drink.js")
    Include("core/proposal/prepare.js")

})(App)