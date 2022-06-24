import React, { useContext, useEffect, useState } from "react";
import { ProposalContext } from "../../context/proposal-state";
import "./dashboard-footer.styles.scss";
import {
  getProposalState,
  getQuorum,
  fundsInsideTreasury,
  checkFundReleaseFromTreasury,
  getVoteStatics
} from "../../utils/governace/governace-interaction";

export default function DashboardFooter() {
  const { proposalId, proposalState, setProposalState } =
    useContext(ProposalContext);

  const [state, setState] = useState("");
  const [quorum, setQuorum] = useState();
  const [funds, setFunds] = useState(0);
  const [releaseFunds, setReleaseFunds] = useState(false);

  // voting states
  const [forVotes, setForVotes] = useState();
  const [againsVotes, setAgainstVotes] = useState();
  const [abstainVotes, setAbstainVotes] = useState();

  // get proposal state
  let getAndSetProposalState = async () => {
    if (proposalId !== null && proposalId !== undefined) {
      let getState = await getProposalState(proposalId);
      setProposalState(String(getState));
    }
  };
  // get updated state in every interval
  let proposalStateInterval = async () => {
    setInterval(() => {
      getAndSetProposalState();
    }, 1000);
  };
  proposalStateInterval();

  // get proposal state output in string
  let proposalStateOutput = () => {
    // States:
    /**
     * 0 - Pending
     * 1 - Active
     * 2 - Canceled
     * 3 - Defeated
     * 4 - Succeeded
     * 5 - Queued
     * 6 - Expired
     * 7 - Executed
     */
    if (proposalState === "0") {
      return "Pending";
    } else if (proposalState === "1") {
      return "Active";
    } else if (proposalState === "2") {
      return "Canceled";
    } else if (proposalState === "3") {
      return "Defeated";
    } else if (proposalState === "4") {
      return "Succeeded";
    } else if (proposalState === "5") {
      return "Queued";
    } else if (proposalState === "6") {
      return "Expired";
    } else if (proposalState === "7") {
      return "Executed";
    } else {
      return "Yet to be triggered";
    }
  };

  // get quorum
  let quorumOutput = async () => {
    let quorumFinal = await getQuorum();
    setQuorum(Math.trunc(quorumFinal));
  }
  quorumOutput();

  useEffect(() => {
    let outputState = proposalStateOutput();
    // console.log(outputState);
    setState(outputState);
    // console.log(state);
  }, [proposalState]);

  // // get funds inside treasury
  let fetchFunds = async () => {
    let fund = await fundsInsideTreasury();
    setFunds(fund);
  }
  fetchFunds();

  // // check funds released or not
  let isFundReleased = async () => {
    let isReleased = await checkFundReleaseFromTreasury();
    let parseRelease = new Boolean(isReleased).toString();
    setReleaseFunds(parseRelease);
  }
  isFundReleased();

  let loadVoteStatics = async () => {
    if(proposalId !== null && proposalId !== undefined) {
      let getVotes = await getVoteStatics(proposalId);
      setForVotes(getVotes.voteFor);
      setAgainstVotes(getVotes.voteAgainst);
      setAbstainVotes(getVotes.voteAbstain);
    }
  }
  loadVoteStatics()

  return (
    <div>
      <div className="card border border-dark" style={{ width: "30rem" }}>
        <div className="card-header">Proposal Details <span className="badge bg-secondary">onchain governance data</span></div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Proposal State: {state} </li>
          <li className="list-group-item">Quorum: {quorum} </li>
          <li className="list-group-item">
            Statics: 
              <button type="button" className="btn btn-primary position-relative result-1">
                For
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {forVotes}
                </span>
              </button>
              <button type="button" className="btn btn-primary position-relative result-2">
                Against
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {againsVotes}
                </span>
              </button>
              <button type="button" className="btn btn-primary position-relative result-3">
                Abstain
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {abstainVotes}
                </span>
              </button>
          </li>
          <li className="list-group-item">Funds Inside Treasury: {funds} </li>
          <li className="list-group-item">Funds Released: {releaseFunds} </li>
        </ul>
      </div>
    </div>
  );
}
