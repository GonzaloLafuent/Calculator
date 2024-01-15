const visor = document.querySelector(".visor");
const expresion = document.querySelector(".expresion");
const resultado = document.querySelector(".resultado");
const btn_operacion = document.querySelector(".btn-operacion");
const btn_numero = document.querySelector(".btn-numero");
const btn_punto = document.querySelector(".btn-punto");
const btn_borrar_todo = document.querySelector(".btn-borrar-todo");
const btn_borrar = document.querySelector(".btn-borrar")
const botones = document.querySelectorAll("button");

let op1 = ["",0];
let op2 = ["",0];
let symbol = "";
let nuevo_simbolo = 0;
let result = 0;

function writeExpresion(exp){
    expresion.textContent +=exp;
}

function updateOp(){
    
}

function load_op(op){
    if(op>=0 || op<=9){
        if(op1[1]==0){
            op1[0] += op;
            op1[1] = nuevo_simbolo==0?0:1;
        } else if(op2[1]==0){
            op2[0] = op;
            op2[1] = symbol===""? 0:1;
        } else{
            operate();
            op1[0] = result;
            op2[0] = op;
        }
    } else { 
        symbol = op;
    }    
}

function operate(){
    let op1_numb = parseInt(op1[0]);
    let op2_numb = parseInt(op2[0]);
    if(op1[1]==1 && op2[1]==1  && symbol!=""){
        if(symbol=="+"){
            result = op1_numb + op2_numb; 
        } else if(symbol=="-"){
            result =  op1_numb - op2_numb;
        } else if(symbol=="x"){
            result = op1_numb * op2_numb;
        } else if(symbol=="/"){
            result = op1_numb/ op2_numb;
        }
        symbol = "";
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
        load_op(e.key);
        operate();
        writeExpresion(e.key==="*"?"x":e.key);    
    } else if(e.key==="Backspace"){
        expresion.textContent = "";
    } else if(e.key==="Enter") {
        resultado.textContent = result;
        op1[0] = 0,op1[1] = 0;
        op2[0] = 0,op2[1] = 0;
    }    
});

botones.forEach(boton => {
    boton.addEventListener("click",(e)=>{

    });
});

function init(){
    
}

init();