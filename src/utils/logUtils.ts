import { addMessage } from '../store/logSlice';
import { Log } from '../store/logSlice';

export const handleAddMessage = (dispatch: Function, logs: Log[], message: string) => {
    const newLog = {
        id: logs.length + 1,
        message: message
    };
    dispatch(addMessage(newLog));
}
