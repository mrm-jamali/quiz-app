const score = JSON.parse(localStorage.getItem("score"))
const heighScore = JSON.parse(localStorage.getItem("highScore")) || [];
const scoreEl = document.querySelector("p")
const btn = document.querySelector("button")
const input = document.querySelector("input")
scoreEl.innerText = score


const saveHandeler = () => {

    if (!input.value || !score) {
        alert("invalid username or score")

    } else {
        const finalScore = {
            name: input.value,score
           
        };

        heighScore.push(finalScore)
        console.log(heighScore)
        heighScore.sort((a,b)=>b.score-a.score)
        heighScore.splice(10)
        localStorage.setItem("highScore",JSON.stringify(heighScore));
        localStorage.removeItem("score")
        window.location.assign("index.html")
    }

}

btn.addEventListener("click", saveHandeler)