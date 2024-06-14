let votes = {}; // Initialize as empty initially
let selectedOption = null;
let hasVoted = false;
let userAccount = null;

async function connectMetamask() {
    userAccount = localStorage.getItem('metamaskAccount'); // Get Metamask account info from localStorage
    if (userAccount) {
        // If Metamask account info is already in localStorage, set the button text
        document.getElementById('metamaskButton').textContent = userAccount;
        await fetchVotes(); // Fetch votes data once Metamask account is confirmed
        return; // Do not proceed with Metamask login flow
    }
    
    if (window.ethereum) { // Check if Metamask is supported
        try {
            // Request Metamask login
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0]; // Get user's account
            // Truncate account to show only parts
            userAccount = userAccount.substring(0, 6) + '......' + userAccount.substring(userAccount.length - 6);
            document.getElementById('metamaskButton').textContent = userAccount; // Set button text to user's Metamask account
            localStorage.setItem('metamaskAccount', userAccount); // Save Metamask account info to localStorage
            await fetchVotes(); // Fetch votes data once Metamask account is confirmed
        } catch (error) {
            console.error('Metamask login failed:', error);
        }
    } else {
        if (window.confirm('Please install Metamask to continue.')) {
            window.open('https://metamask.io/download/', '_blank');
        }
    }
}

async function fetchVotes() {
    try {
        const response = await fetch('/api/active-votes'); // Fetch active votes from Flask API
        if (!response.ok) {
            throw new Error('Failed to fetch active votes.');
        }
        const data = await response.json(); // Convert response to JSON
        // Update votes object with fetched data
        data.forEach(vote => {
            votes[vote.option] = vote.count;
        });
        // Update UI if necessary (not shown in this simplified example)
    } catch (error) {
        console.error('Error fetching votes:', error);
    }
}

async function castVote(option) {
    if (!hasVoted && userAccount) { // Check if user has connected Metamask
        selectedOption = option;
        for (let key in votes) {
            if (key === option) {
                document.getElementById(key).style.backgroundColor = '#5B7493';
            } else {
                document.getElementById(key).style.backgroundColor = '';
            }
        }
    } else {
        alert('Please connect Metamask to vote!');
    }
}

async function submitVote() {
    if (!hasVoted && userAccount) { // Check if user has connected Metamask
        if (selectedOption) {
            // Increment the count for the selected option
            try {
                const response = await fetch('/vote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ option: selectedOption })
                });
                if (!response.ok) {
                    throw new Error('Failed to submit vote.');
                }
                votes[selectedOption]++; // Update local votes count
                hasVoted = true; // Set hasVoted to true after successful vote
                updateChart(); // Update chart after successful vote (not shown in this simplified example)
            } catch (error) {
                console.error('Error submitting vote:', error);
            }
        } else {
            alert('Please select an option!');
        }
    } else {
        let button = document.querySelector('.submit-button');
        button.disabled = true;
        button.style.backgroundColor = '#999';
        
        if (!userAccount) {
            // Prompt user to connect Metamask
            alert('Please connect Metamask to vote!');
            return;
        }

        // Display warning message for already voted user
        let warningMessage = document.createElement('span');
        warningMessage.textContent = ` ${userAccount} You have already voted!`;
        warningMessage.style.color = 'red';
        button.parentNode.insertBefore(warningMessage, button.nextSibling);
    }
}

function getRandomColor() {
    // Function to generate random colors
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Call connectMetamask on page load
connectMetamask();
