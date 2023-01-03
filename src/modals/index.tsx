import type {
    Action,
    ActionData,
    ConfimProps,
    PromptProps
} from '../support/types';

import {
    useEffect,
    useState
} from 'react';

import Confirm from './Confirm';
import Prompt from './Prompt';

export default function Modals({ action } : { action ?: ActionData }) {

    const [ confirm, setConfirm ] = useState<ConfimProps>({
        show: false,
        title: 'Confirmar',
        content: '',
        onHide: () => setConfirm(confirm => ({ ...confirm, show: false })),
        onConfirm: () => {}
    });

    const [ prompt, setPrompt ] = useState<PromptProps>({
        show: false,
        title: 'Informar',
        content: '',
        value: '',
        placeholder: '',
        onHide: () => setPrompt(prompt => ({ ...prompt, show: false })),
        onChange: value => value,
        onConfirm: () => {}
    });

    const onAction : Action = (type, payload) => {
        switch(type) {
            case 'confirm': setConfirm(confirm => ({ ...confirm, ...payload as ConfimProps, show: true })); break;
            case 'prompt':  setPrompt(prompt => ({ ...prompt, ...payload as PromptProps, show: true }));    break;
        }
    }

    useEffect(() => action ? onAction(action.type, action.payload) : undefined, [ action ]);

    return <>
    
        <Confirm { ...confirm } />
        <Prompt { ...prompt } />

    </>;

}