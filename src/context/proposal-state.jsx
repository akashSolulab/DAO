import { createContext, useEffect, useState } from "react";

export const ProposalContext = createContext({
    proposalId: null,
    setProposalId: () => null,
    propsalState: null,
    setProposalState: () => null
});

export const ProposalProvider = ({children}) => {
    const [proposalId, setProposalId] = useState();
    const [proposalState, setProposalState] = useState();

    useEffect(() => {
        let setItems = async () => {
            setProposalId(proposalId);
        }
        setItems()
    }, [proposalId]);

    let value = {proposalId, setProposalId, proposalState, setProposalState}
    return(
        <ProposalContext.Provider value={value}> {children} </ProposalContext.Provider>
    )
}