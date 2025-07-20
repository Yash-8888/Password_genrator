import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(0)
  const [numberallowed, setnumberallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setpassword] = useState("")

  const  passwordref = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str  = "abcdefghijklmnopqrstuvwxyz"
    if (numberallowed) {
      str += "0123456789"
    }
    if (charallowed) {
      str += "!@#$%^&*()_+[]{}|;:,.<>?/"
    }
    for (let i = 0; i <=length; i++) {
      const Char = Math.floor(Math.random() * str.length)
      pass += str.charAt(Char) 
    }
    setpassword(pass)
  }, [length, numberallowed, charallowed])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberallowed, charallowed])

  const copypasstoclipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    alert("password copied to clipboard")
    passwordref.current.select()
  }, [password])
  return (
    <>
      <div className='text-center w-full max-w-md mx-auto shadow-lg rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-2xl font-bold'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full rounded-l-lg py-1 px-3 bg-white my-7 '
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button onClick={copypasstoclipboard} className="otline-none bg-blue-500 text-white px-3 mt-7 mb-7 shrink-0 rounded-r-lg hover:bg-blue-600 click-border-2 hover:scale-105 transition-all duration-200 cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex text-sm gap-x-2">
            <input 
             type="range"
             min={6}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e) => {setlength(e.target.value)}}
            />
            <label>
              length: {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
             type="Checkbox" 
             defaultChecked={numberallowed}
             id="numberInput"
             onChange={() => {
               setnumberallowed((prev) => !prev);
             }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
             type="Checkbox" 
             defaultChecked={charallowed}
             id="characterInput"
             onChange={() => {
               setcharallowed((prev) => !prev);
             }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
