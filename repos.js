//main variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button")
let reposData = document.querySelector(".show-data")

getButton.onclick = function() {
    getRepos()
}

//get repos function
function getRepos() {

    if (theInput.value == "") { //if value is empty

    reposData.innerHTML = "<span>please write github username.</span>";

    } else{

        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((res) => {
            return res.json();
        })
        .then((repostries) => {
            // empty the container
            reposData.innerHTML = '';

            //loop on repostries
            repostries.forEach(repo => {

                //create main div element
                let mainDiv = document.createElement("div");

                //create repo name text
                let repoName = document.createTextNode(repo.name);

                //append the text to main div
                mainDiv.appendChild(repoName);

                //create repo url anchor
                let theUrl = document.createElement("a");

                //create url text
                let theUrlText = document.createTextNode("visit")

                //append the repo url text yo anchor tag
                theUrl.appendChild(theUrlText);

                //add the hypertext refernce "href"
                theUrl.href = `https://github.com/${theInput.value}l/${repo.name}`

                //set attribute blank
                theUrl.setAttribute('target', '_blank');

                //append url anchor to main div
                mainDiv.appendChild(theUrl)

                //create stars count span
                let starSpan = document.createElement("span")

                //create the stars count text
                let starsText = document.createTextNode(`stars ${repo.stargazers_count}`)

                //add stars count text to stars span
                starSpan.appendChild(starsText)

                //append stars count span to main div
                mainDiv.appendChild(starSpan)

                //add class on main div
                mainDiv.className = 'repo-box'
                //append the main div to container
                reposData.appendChild(mainDiv);

            });

        });

    }

}