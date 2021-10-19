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
        app.Proposals[groupid] = proposals
    }

    let try_proposals = function (proposals, onfinish) {
        for (var i in proposals) {
            let proposal = app.Proposals[proposals[i]]
            if (!proposal) {
                throw "要约 [" + groupid + "] 没找到"
            }
            if (proposal.Evaluate()) {
                proposal.Accept(onfinish)
                return true
            }
        }
        return false
    }
    let tyr_proposalgroup = function (groupid, onfinish) {
        let group = app.ProposalGroups[groupid]
        if (!group) {
            throw "要约组 [" + groupid + "] 没找到"
        }
        return try_proposals(group, onfinish)

    }
    let tyr_proposalgroups = function (groups, onfinish) {
        for (var i in groups) {
            let group=groups[i]
            if (try_proposalgroup(group,onfinish)){
                return true
            }
        }
        return false
    }
    app.TryProposalGroups = function (groups, onfinish, onrejected) {
        if (tyr_proposalgroups(groups, onfinish)) {
            return true
        }
        app.ExecuteCallback(onrejected)
        return false

    }
    app.TryProposalGroup = function (groupid, onfinish, onrejected) {
        if (tyr_proposalgroup(groupid, onfinish)) {
            return true
        }
        app.ExecuteCallback(onrejected)
        return false
    }
    app.TryProposals = function (proposals, onfinish, onrejected) {
        if (try_proposals(proposals, onfinish)) {
            return true
        }
        app.ExecuteCallback(onrejected)
        return false
    }
})(App)