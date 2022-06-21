import { ethers } from "ethers";
import Token from '../../contracts/Token.json'
import Treasury from '../../contracts/Treasury.json'
import Governance from '../../contracts/Governance.json'
import TimeLock from '../../contracts/TimeLock.json'


const provider = new ethers.providers.Web3Provider(window.ethereum);

// fetching contract adderesses
const tokenContract = process.env.REACT_APP_TOKEN_CONTRACT;
const timelockContract = process.env.REACT_APP_TIMELOCK_CONTRACT;
const governanceContract = process.env.REACT_APP_GOVERNANCE_CONTRACT;
const treasuryContract = process.env.REACT_APP_TREASURY_CONTRACT;

// fetching contract ABIs
const tokenABI = Token.abi
const treasuryABI = Treasury.abi
const governanceABI = Governance.abi
const timelockABI = TimeLock.abi

// Initiating contract instance:
const tokenContractInstance = new ethers.Contract(tokenContract, tokenABI, provider);
const timelockContractInstnce = new ethers.Contract(timelockContract, timelockABI, provider);
const governanceContractInstance = new ethers.Contract(governanceContract, governanceABI, provider);
const treasuryContractInstance = new ethers.Contract(treasuryContract, treasuryABI, provider)
console.log(treasuryContractInstance);

// initiating signerObj and signer
let signer;
let signerObj;

// Getting signer from provider:
const getSigner = async () => {
    await provider.send("eth_requestAccounts", [])
    signerObj = provider.getSigner()
    signer = await signerObj.getAddress()
}

// delegate token
export const delegateGovernanceToken = async (walletAddress) => {
    try {
        await getSigner();
        console.log(signer);
        console.log("provider", provider);
        await tokenContractInstance.connect(signerObj).delegate(walletAddress);
    }
    catch (err) {
        console.log(err);
    }
} 

// check is funds released from treasury
export const checkFundReleaseFromTreasury = async () => {
    await treasuryContractInstance.isReleased();
}

// show in UI - time remaining in releasing funds (calculate the block-time and convert into hours, minutes, sec)
export const getFundsFromTreasury = async () => {

}

// show in UI funds inside treasury

// show in UI - the current STATE of the proposal (use setTimeOut function here)

// create proposal

// get proposal id from the transaction --->   const id = tx.logs[0].args.proposalId

// fetch snapshot - vote start time

// fetch deadline - vote end time

// show in UI - quorum(min number of votes required)

// make a function to caste vote - take flag as a input (0, 1, 2)

// show in UI - voting statics - how many votes are FOR, AGAINST, ABSTAIN

// create queue for the proposal

// create execute the proposal

// check for funds released in UI