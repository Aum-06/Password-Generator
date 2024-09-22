import React, { useCallback, useState, useEffect,useRef } from "react";
import { FaRegCopy } from "react-icons/fa6";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()[]{}-=_+[]{}";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);
 
 
  useEffect(()=>{
  passwordGenerator()
 },[length, numberAllowed, charAllowed, passwordGenerator])
 
 
 const passwordRef = useRef(null)
  

   return (
     <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
       <div className="bg-white px-6 py-8 rounded-xl shadow-2xl w-full max-w-md">
         <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Password Generator</h1>
         <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 mb-6">
           <input
             ref={passwordRef}
             type="text"
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             className="bg-transparent rounded-md p-2 w-full outline-none text-lg"
             placeholder="Generated Password"
             readOnly
           />
           <button
             onClick={() => {
               passwordRef.current.select();
               window.navigator.clipboard.writeText(password);
               alert("Copied to clipboard");
             }}
             className="ml-2 focus:outline-none"
           >
             <FaRegCopy className="text-gray-500 hover:text-gray-700 transition-colors duration-200 size-6" />
           </button>
         </div>
         <div className="space-y-4">
           <div className="flex flex-col">
             <input
               type="range"
               min={8}
               max={50}
               value={length}
               onChange={(e) => setLength(e.target.value)}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
             />
             <label htmlFor="length" className="mt-2 text-sm font-medium text-gray-600">
               Length: {length}
             </label>
           </div>
           <div className="flex items-center space-x-4">
             <label className="inline-flex items-center">
               <input
                 type="checkbox"
                 id="number"
                 defaultChecked={numberAllowed}
                 onChange={() => setNumberAllowed((prev) => !prev)}
                 className="form-checkbox h-5 w-5 text-blue-600 rounded"
               />
               <span className="ml-2 text-gray-700">Numbers</span>
             </label>
             <label className="inline-flex items-center">
               <input
                 type="checkbox"
                 id="char"
                 defaultChecked={charAllowed}
                 onChange={() => setCharAllowed((prev) => !prev)}
                 className="form-checkbox h-5 w-5 text-blue-600 rounded"
               />
               <span className="ml-2 text-gray-700">Characters</span>
             </label>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default App;

