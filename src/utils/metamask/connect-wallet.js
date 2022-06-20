let accounts = [];
export async function requestAccounts () {
    if(window.ethereum) {
        console.log("Detected");

        try {
            accounts = window.ethereum.request({
                method: "eth_requestAccounts"
            })
            return accounts;
        }

        catch (err) {
            console.error(err);
        }
    }
    else {
        alert("Please install metamask first");
    }
}