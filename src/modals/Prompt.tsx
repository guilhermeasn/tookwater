import { ModalProps } from "../support/types";

export default function Prompt(props : ModalProps) {

    if(!props.show) return <></>;

    return (

        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center text-center items-center p-0">
                
                    <div className=" m-3 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 p-6">
                            <div className="flex items-start">
                                <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-red-100 mx-0 h-10 w-10">
                                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div className="-mt-3 ml-4 text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">{ props.title }</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{ props.content }</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                            <button type="button" onClick={ () => { props.onConfirm(); props.onHide(); } } className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-3 w-auto text-sm">Sim</button>
                            <button type="button" onClick={ props.onHide } className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-0 ml-3 w-auto text-sm">Não</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );

}