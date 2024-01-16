const visor = document.querySelector(".visor");
const expresion = document.querySelector(".expresion");
const resultado = document.querySelector(".resultado");
const btn_operacion = document.querySelector(".btn-operacion");
const btn_numero = document.querySelector(".btn-numero");
const btn_punto = document.querySelector(".btn-punto");
const btn_borrar_todo = document.querySelector(".btn-borrar-todo");
const btn_borrar = document.querySelector(".btn-borrar")
const botones = document.querySelectorAll("button");

const first_operand = {
    value: "",
    ready: 0
}

const second_operand = {
    value: "",
    ready: 0
}

/* no olviadar de modiciar que op2[0] 0 value y op2[1]= available, palica para los dos op */
let operator = "";
let result = "";

function writeExpresion(exp){
    expresion.textContent +=exp;
}

function setOperandReady(operator){
    if(operator==="+"||operator==="-"||operator==="/" || operator === "*" || operator === "Enter"){
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
            first_operand.value = ""+result;
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

window.addEventListener("keydown",(e)=>{
    if(e.key>=0 && e.key<=9){ 
        setOperandReady(e.key);
        parseSymbols(e.key);
        writeExpresion(e.key);
    } else if(e.key==="+"||e.key==="-"||e.key==="/" || e.key==="." || e.key === "*"){
        setOperandReady(e.key);
        parseSymbols(e.key==="*"?"x":e.key);
        writeExpresion(e.key==="*"?"x":e.key);    
    } else if(e.key==="Backspace"){
        expresion.textContent = "";
        result = "";
        first_operand.value = ""; first_operand.ready = 0;
        second_operand.value = ""; second_operand.ready = 0;
        resultado.textContent = "";
    } else if(e.key==="Enter") {
        setOperandReady(e.key)
        operate();
        resultado.textContent = result;
        first_operand.value = ""+result; first_operand.ready = 0;
        second_operand.value = "",second_operand.ready = 0;
    }    
});

botones.forEach(boton => {
    boton.addEventListener("click",(e)=>{
        txt_btn = e.target.textContent;
        if(txt_btn>=0 && txt_btn<=9){ 
            setOperandReady(txt_btn==="x"?"*":txt_btn);
            parseSymbols(txt_btn);
            writeExpresion(txt_btn);
        } else if(txt_btn==="+"||txt_btn==="-"||txt_btn==="/" || txt_btn==="." || txt_btn === "x"){
            setOperandReady(txt_btn==="x"?"*":txt_btn);
            parseSymbols(txt_btn);
            writeExpresion(txt_btn);    
        } else if(txt_btn==="BORRAR TODO"){
            expresion.textContent = "";
            result = "";
            first_operand.value = ""; first_operand.ready = 0;
            second_operand.value = ""; second_operand.ready = 0;
            resultado.textContent = "";
        } else if(txt_btn==="=") {
            setOperandReady("Enter")
            operate();
            resultado.textContent = result;
            first_operand.value = ""+result; first_operand.ready = 0;
            second_operand.value = "",second_operand.ready = 0;
        }    
    });
});

