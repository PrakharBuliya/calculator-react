import {ACTIONS} from './App'

export default function DigitButton({dispach, digit}) {
    return (
    <button 
        onClick={() => dispach({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
        {digit}
    </button>
    )
}