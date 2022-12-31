import { PromptProps } from "../support/types";
import { TextInput } from "@tremor/react";
import { useState } from 'react';

export default function Prompt(props : PromptProps) {

    const [ value, setValue ] = useState<string>(props.value);

    function submit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.onConfirm(value);
        props.onHide();
    }

    if(!props.show) return <></>;

    return (

        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center text-center items-center p-0">
                
                    <form onSubmit={ submit } className="m-3 relative overflow-hidden rounded-lg bg-white text-left shadow-xl my-8 w-full max-w-lg">
                        
                        <div className="px-4 py-3 items-start">
                            <div className="text-left">
                                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                    { props.title }
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{ props.content }</p>
                                    <TextInput
                                        value={ value }
                                        onChange={ i => setValue(props.onChange(i.currentTarget.value)) }
                                        placeholder={ props.placeholder }
                                        maxWidth="max-w-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 px-4 py-3 flex justify-end">
                            <button type="button" onClick={ props.onHide } className="cursor-pointer inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-0 ml-3 w-auto text-sm">Cancelar</button>
                            <button type="submit" className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-3 w-auto text-sm">Confirmar</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

    );

}