import React from "react";
import './dashboard.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquare } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  return (
    <div>
      <div className="card text-center">
        <div className="card-header">
          <p>DAO Voting Proposal</p>
          <a href="https://ethereum.org/en/dao/" className="btn btn-primary learn-more">
            Learn More  <FontAwesomeIcon icon={faExternalLinkSquare} />
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">Treasury Release</h5>
          <p className="card-text">
            Please place your valuable vote in-order to release funds from the treasury
          </p>
          <div className="vote-button">
            <button type="button" className="btn btn-success vote-button-1">For</button>
            <button type="button" className="btn btn-danger vote-button-2">Against</button>
            <button type="button" className="btn btn-warning vote-button-3">Abstain</button>
          </div>
        </div>
        <div className="card-footer text-muted">Time Left: 20 minutes</div>
      </div>
    </div>
  );
}
