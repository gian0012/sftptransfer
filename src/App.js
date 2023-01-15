import React from 'react';
import './App.css';
import Forms from './components/Forms/Forms';

function App() {
    return (
        <div className="bg-[#374151]  ">
            <div className="text-center p-3 ">
                <h1 className="text-3xl text-zinc-800 text-gray-400  font-montserrat">
                    SFTP File Transfer </h1>
            </div>
            <Forms/>
        </div>
    );
}

export default App;
