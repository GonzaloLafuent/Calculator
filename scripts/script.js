const visor = document.querySelector(".visor");
const expresion = document.querySelector(".expresion");
const resultado = document.querySelector(".resultado");
const btn_operacion = document.querySelector(".btn-operacion");
const btn_numero = document.querySelector(".btn-numero");
const btn_punto = document.querySelector(".btn-punto");
const btn_borrar_todo = document.querySelector(".btn-borrar-todo");
const btn_borrar = document.querySelector(".btn-borrar")
const botones = document.querySelectorAll("button");

const op1 = {
    value: "",
    ready: 0
}

const op2 = {
    value: "",
    ready: 0
}

/* no olviadar de modiciar que op2[0] 0 value y op2[1]= available, palica para los dos op */
let symbol = "";
let result = "";

function writeExpresion(exp){
    expresion.textContent +=exp;
}

function updateOp(e){
    if(e==="+"||e==="-"||e==="/" || e==="." || e === "*" || e === "Enter"){
        if(!op1.ready) op1.ready = 1;
        else if(!op2.ready) op2.ready = 1;
    }
}

function load_op(op){
    if(op>=0 || op<=9){
        if(!op1.ready){
            op1.value += op;
        } else if(!op2.ready){
            op2.value += op;
        }
    } else {
        if(op1.ready && op2.ready){
            operate();
            op1.value = ""+result;
            op2.ready = 0;
            op2.value = "";
        }    
        symbol = op;
    }    
}


function operate(){
    if(op1.ready && op2.ready){
        let op1_numb = (op1.value.includes("."))?parseFloat(op1.value):parseInt(op1.value);
        let op2_numb = (op2.value.includes("."))?parseFloat(op2.value):parseInt(op2.value);
        if(symbol=="+"){
            result = op1_numb + op2_numb; 
        } else if(symbol=="-"){
            result =  op1_numb - op2_numb;
        } else if(symbol=="x"){
            result = op1_numb * op2_numb;
        } else if(symbol=="/"){
            result = op1_numb/ op2_numb;
        }
    }
}

window.addEventListener("keydown",(e)=>{
    if(e.key>=0 && e.key<=9){ 
        updateOp(e.key);
        load_op(e.key);
        operate();
        writeExpresion(e.key);
    } else if(e.key==="+"||e.key==="-"||e.key==="/" || e.key==="." || e.key === "*"){
        updateOp(e.key);
        load_op(e.key==="*"?"x":e.key);
        operate();
        writeExpresion(e.key==="*"?"x":e.key);    
    } else if(e.key==="Backspace"){
        expresion.textContent = "";
        result = "";
        op1.value = ""; op1.ready = 0;
        op2.value = ""; op2.ready = 0;
        resultado.textContent = "";
    } else if(e.key==="Enter") {
        updateOp(e.key)
        operate();
        resultado.textContent = result;
        op1.value = ""+result; op1.ready = 0;
        op2.value = "",op2.ready = 0;
    }    
});

botones.forEach(boton => {
    boton.addEventListener("click",(e)=>{

    });
});

function init(){
    
}

init();