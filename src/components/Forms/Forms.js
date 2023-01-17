import {React, useEffect, useState} from 'react';
import uuid from 'react-uuid';


export default function Forms() {

    const token = uuid();

    const [values, setValues] = useState({});
    const [fileName, setFileName] = useState();

    const handleFileChange = async e => {
        e.preventDefault();
        const selectedFile = document.getElementById('dropzone-file').files[0];
        setFileName(selectedFile.name)

    }
    const handleSubmit = async e => {
        e.preventDefault();

        const formValues = ['username', 'address', 'port', 'address', 'folder'];

        formValues.forEach(form => {
            setValues(prev => ({
                ...prev,
                [form]: e.target[form].value
            }))
        });

        await fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        const  file = document.getElementById('dropzone-file').files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
           await fetch('/data', {
               method: "POST",
               body: formData,
               headers: {
                   'Content-Type':'multipart/form-data'
               }
           }).then(res => {
               console.log(res);
           })
        }


    }

    return (
        <div>
            <div className="w-full  content-center flex flex-col justify-center items-center">


                <form onSubmit={handleSubmit} encType="multipart/form-data">

                    <div className="bg-[#111827] rounded-md p-4 mt-7">

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="mb-6">
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Address
                                </label>
                                <input type="text" id="address"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="192.123.1.123"
                                       required/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">SSH
                                    Password</label>
                                <input type="password" id="password"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required/>
                            </div>
                        </div>


                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="mb-6">
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">SSH
                                    Username</label>
                                <input type="text" id="username"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="root" required/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="port"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">SSH
                                    Port
                                </label>
                                <input type="number" id="port"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="22" required/>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="folder"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Destination
                                    folder
                                </label>
                                <input type="text" id="folder"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="/path/to/folder" required/>
                            </div>
                        </div>

                        <div>
                            <div className="mb-6">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file"
                                           className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                                                 stroke="currentColor" viewBox="0 0 24 24"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{fileName ? fileName : '(MAX. 2 Gb)'}</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden"
                                               onChange={handleFileChange}/>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit"
                                className="text-white bg-sky-500/50 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                        </button>
                    </div>


                </form>

            </div>
        </div>
    )
}