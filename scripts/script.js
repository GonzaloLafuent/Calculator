const visor = document.querySelector(".visor");
const expresion = document.querySelector(".expresion");
const resultado = document.querySelector(".resultado")

window.addEventListener("keypress",(e)=>{
    if(e.key>=0 && e.key<=9)
        expresion.textContent+=e.key;
    else if(e.key==="+"||e.key==="-"||e.key==="/" || e.key===".")
        expresion.textContent+=e.key;
    else if(e.key==="*")
        expresion.textContent+="x"; 
    else if(e.key==="Enter")
        resultado.textContent = "hola"
});