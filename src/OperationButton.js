import {ACTIONS} from './App'

export default function OperationButton({dispach, operation}) {
    return (
    <button 
        onClick={() => dispach({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
        {operation}
    </button>
    )
}