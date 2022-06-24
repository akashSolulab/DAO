import React, { useContext, useState } from "react";
import "./dashboard.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquare } from "@fortawesome/free-solid-svg-icons";
import {
  delegateGovernanceToken,
  createNewProposal,
  remainingTimeToVote,
  castVoteAndParticipate,
} from "../../utils/governace/governace-interaction";
import { WalletContext } from "../../context/connect-wallet.context";
import { ProposalContext } from "../../context/proposal-state";
import DashboardFooter from "../dashboard-footer/dashboard-footer.component";

export default function Dashboard() {
  const { account } = useContext(WalletContext);
  const { proposalId, setProposalId} =
    useContext(ProposalContext);

  const [remainingTime, setRemainingTime] = useState();

  let getProposal = async () => {
    let getId = await createNewProposal();
    setProposalId(getId);
  };

  let loadRemainingTime = async () => {
    if(proposalId !== null && proposalId !== undefined) {
      let fetchTime = await remainingTimeToVote(proposalId);
      setRemainingTime(fetchTime)
    }
  }
  loadRemainingTime()



  return (
    <div>
      <div>
        <button
          className="btn btn-outline-dark proposal-button"
          onClick={() => {
            getProposal();
          }}
        >
          <b>Create proposal</b>
        </button>
      </div>
      <div className="card text-center border border-2 border-dark mb-3">
        <div className="card-header border-dark">
          <p>DAO Voting Proposal</p>
          <a
            href="https://ethereum.org/en/dao/"
            className="btn btn-primary learn-more"
          >
            Learn More <FontAwesomeIcon icon={faExternalLinkSquare} />
          </a>
        </div>
        <div className="card-body border-dark">
          <h5 className="card-title">Treasury Release</h5>
          <p className="card-text">
            Please place your valuable vote in-order to release funds from the
            treasury
          </p>
          <div className="vote-button">
            <button
              type="button"
              className="btn btn-success vote-button-1"
              onClick={async () => {
                await delegateGovernanceToken(account);
                await castVoteAndParticipate(proposalId, 1)
              }}
            >
              For
            </button>
            <button type="button" className="btn btn-danger vote-button-2"
              onClick={async () => {
                await delegateGovernanceToken(account);
                await castVoteAndParticipate(proposalId, 0)                   
              }}
            >
              Against
            </button>
            <button type="button" className="btn btn-warning vote-button-3"
              onClick={async () => {
                await delegateGovernanceToken(account);
                await castVoteAndParticipate(proposalId, 0)                   
              }}
            >
              Abstain
            </button>
          </div>
        </div>
        <div className="card-footer border-dark text-muted">
          <b>Note: </b> <b className="remaining-time">{remainingTime}</b> minutes left to vote
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}
