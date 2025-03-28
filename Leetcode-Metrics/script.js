document.addEventListener("DOMContentLoaded", function() {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label"); 
    const hardLabel = document.getElementById("hard-label"); 
    const cardStatsContainer = document.querySelector(".stats-card"); 


    function validateUsername(username){
        if(username.trim() === "") {
            alert("Username should not be Empty.");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching){
            alert("Invalid Username")
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        
        try {
            searchButton.textContent = "searching...";
            searchButton.disabled = true;

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com'
            const targetUrl = `https://leetcode.com/graphql`;
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n  query userSessionProgress($username: String!) {\n   allQuestionsCount {\n   difficulty\n    count\n }\n matchedUser(username: $username) {\n    submitStats {\n     acSubmissionNum {\n     difficulty\n    count\n     submission\n    } \n    totalSubmissionnNum {\n     difficulty\n    count\n     submission\n    }\n     }\n     }\n}\n      ", variables: {"username": `${username}`}
            })

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Unable to Fetch the User Details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ",parsedData);

            dislayUserData(parsedData);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>No data Found</p>`
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved/total)*360;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData (parsedData) {
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedEasyTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMediumTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHardTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedEasyTotalQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMediumTotalQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHardTotalQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardData =[
            {label: "Overall Subissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
            {label: "Overall Easy Subissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
            {label: "Overall Medium Subissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
            {label: "Overall Hard Subissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions},
        ];

        console.log("card data:", cardData);

        cardStatsContainer.innerHTML = cardData.map(data => 
            `
            <div class="card">
            <h3>${data.label}</h3>
            <p>${data.value}</p>
            </div>`
        ).join("")
    }

    searchButton.addEventListener("click", function() {
        const username = usernameInput.value;
        console.log("loggin username: ",username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    })
})

