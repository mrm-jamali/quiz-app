const buttons=document.querySelectorAll("button")

const selectHandeler=(event) => {
    console.log("hiiiiiiiii")
    const level=event.target.innerText.toLowerCase();
    localStorage.setItem("level",level)
    window.location.assign("index.html")
}
buttons.forEach((button)=>{
    button.addEventListener("click",selectHandeler)
})