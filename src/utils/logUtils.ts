import { addMessage } from '../store/logSlice';

export const handleAddMessage = (logs: any[], message: string, dispatch: Function) => {
    const newLog = {
        id: logs.length + 1,
        message: message
    };
    dispatch(addMessage(newLog));
}
