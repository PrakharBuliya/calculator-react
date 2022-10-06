import React, { useReducer, useState } from "react"
import styles from "./styles.css"
import DigitButton from "./DIgitButton"
import OperationButton from "./OperationButton"

export const ACTIONS ={
    ADD_DIGIT : 'add-digit',
    CHOOSE_OPERATION:'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVLUATE:'evaluate' 
}

function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.ADD_DIGIT: 
        if(state.overWrite) {
            return {
                ...state,
                currentOperand: payload.digit,
                overWrite:false,
            }
        }
            if(payload.digit === "0" && state.currentOperand === "0") {return state}
            if(payload.digit === "." && state.currentOperand.includes(".")) {return state}
        return {
            ...state,
            currentOperand: `${state.currentOperand || ""}${payload.digit}`
    }
    case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousOperand == null) {
            return state
        }

        if(state.currentOperand == null) {
            return {
                ...state,
                operation: payload.operation,
        }
        }

        if(state.previousOperand == null) {
            return {
                ...state,
                operation: payload.operation,
                previousOperand: state.currentOperand,
                currentOperand: null
            }
        }

        return {
            ...state,
            previousOperand: evaluate(state),
            operation: payload.operation,
            currentOperand:null
        }
    case ACTIONS.CLEAR:
        return {}
    
    case ACTIONS.DELETE_DIGIT:
        if(state.overWrite) {
            return {
                ...state,
                overWrite:false,
                currentOperand:null
            }
        }
        if(state.currentOperand == null) return state
        if(state.currentOperand.length === 1) {
            return {...state, currentOperand: null}
        }

        return {
            ...state,
            currentOperand: state.currentOperand.slice(0,-1)
        }
        case ACTIONS.EVLUATE:
            if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                return  state
            }
            return {
                ...state,
                overWrite: true,
                previousOperand:null,
                operation:null,
                currentOperand: evaluate(state),
            }
    }
}

function evaluate({currentOperand, previousOperand, operation}) {
    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    if(isNaN(previous) || isNaN(current)) return ""

    let computation = ""
    switch(operation) {
        case "+":
            computation = previous + current
            break
        case "-":
            computation = previous - current
            break
        case "*":
            computation = previous * current
            break
        case "÷":
            computation = previous / current
            break
    }
    return computation.toString()
}

function App() {
    const[{currentOperand, previousOperand, operation}, dispach] =useReducer(reducer , {})

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{previousOperand} {operation}</div>
                <div className="current-operand">{currentOperand}</div>
            </div>
            
            <button className="span-two" onClick={() => dispach({type: ACTIONS.DELETE_DIGIT})}>AC</button>
            <button onClick={() => dispach({type: ACTIONS.CLEAR})}>Del</button>
            <OperationButton operation="÷" dispach={dispach} />
            <DigitButton digit="1" dispach={dispach}/> 
            <DigitButton digit="2" dispach={dispach}/> 
            <DigitButton digit="3" dispach={dispach}/> 

            <OperationButton operation="*" dispach={dispach} />

            <DigitButton digit="4" dispach={dispach}/> 
            <DigitButton digit="5" dispach={dispach}/> 
            <DigitButton digit="6" dispach={dispach}/> 

            <OperationButton operation="+" dispach={dispach} />

            <DigitButton digit="7" dispach={dispach}/> 
            <DigitButton digit="8" dispach={dispach}/> 
            <DigitButton digit="9" dispach={dispach}/> 

            <OperationButton operation="-" dispach={dispach} />

            <DigitButton digit="." dispach={dispach}/> 
            <DigitButton digit="0" dispach={dispach}/> 
            <button className="span-two" onClick={() => dispach({type: ACTIONS.EVLUATE})}>=</button>
        </div>
    )
}

export default App;