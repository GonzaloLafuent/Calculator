const expresion = document.querySelector(".expresion");
const resultado = document.querySelector(".resultado");
const btn_operacion = document.querySelector(".btn-operacion");
const botones = document.querySelectorAll("button");

const btn_numeros = document.querySelectorAll(".btn-numero");

const first_operand = {
    value: "",
    ready: 0
}

const second_operand = {
    value: "",
    ready: 0
}

let operator = "";
let result = "";

function writeExpresion(exp){
    expresion.textContent +=exp;
}

function setOperandReady(operator){
    if(operator==="+"||operator==="-"||operator==="/" || operator === "x" || operator === "Enter" || operator==="="){
        if(!first_operand.ready) first_operand.ready = 1;
        else if(!second_operand.ready) second_operand.ready = 1;
    }
}

function parseSymbols(symbol){
    if((symbol>=0 || symbol<=9) || symbol==="."){
        if(!first_operand.ready){
            first_operand.value += symbol;
        } else if(!second_operand.ready){
            second_operand.value += symbol;
        }
    } else {
        if(first_operand.ready && second_operand.ready){
            operate();
            expresion.textContent = result.toString();
            first_operand.value = result.toString();
            second_operand.ready = 0;
            second_operand.value = "";
        }    
        operator = symbol;
    }    
}


function operate(){
    if(first_operand.ready && second_operand.ready){
        let first_operand_num = (first_operand.value.includes("."))?parseFloat(first_operand.value):parseInt(first_operand.value);
        let second_operand_num = (second_operand.value.includes("."))?parseFloat(second_operand.value):parseInt(second_operand.value);
        if(operator==="+"){
            result = first_operand_num + second_operand_num; 
        } else if(operator==="-"){
            result =  first_operand_num - second_operand_num;
        } else if(operator==="x"){
            result = first_operand_num * second_operand_num;
        } else if(operator==="/"){
            result = first_operand_num / second_operand_num;
        }
    }
}

function returnResult(){
    resultado.textContent = result;
    expresion.textContent = result;
    first_operand.value = result.toString(); first_operand.ready = 0;
    second_operand.value = "",second_operand.ready = 0;
}

function clearAllVisor(){
    expresion.textContent = "";
    result = "";
    first_operand.value = ""; first_operand.ready = 0;
    second_operand.value = ""; second_operand.ready = 0;
    resultado.textContent = "";
}

function loadOp(event_code){
    setOperandReady(event_code);
    parseSymbols(event_code);
    writeExpresion(event_code);
}

function userComunication(event){
    let event_code = (event.type==="keydown")?event.key:event.target.textContent;
    event_code = (event_code==="*")?"x":event_code;

    if(event_code>=0 && event_code<=9) loadOp(event_code);
    else if(event_code==="+"||event_code==="-"||event_code==="/" || event_code==="." || event_code === "x"){
        if(event.type==="keydown" && event_code==="/") event.preventDefault();
        loadOp(event_code);    
    } else if(event_code==="Backspace" || event_code==="BORRAR TODO") clearAllVisor();
    else if(event_code==="Enter" || event_code==="=") {
        if(event.type==="keydown")event.preventDefault();
        setOperandReady(event_code)
        operate();
        returnResult();
    } 
}

function init(){
    window.addEventListener("keydown",userComunication);

    botones.forEach(boton => {
        boton.addEventListener("click",userComunication); 
    });
}

init();

