import { useCallback, useState ,useEffect, useRef } from 'react'
import './App.css'
import Navvbar from './component/Navvbar'

function App() {
  const [length, setLength] = useState("8")
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const copyPassword = useCallback(
    () => {
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0, 20)
      window.navigator.clipboard.writeText(password)

    },
    [password],
  )
  

  const passwordGenerator = useCallback( ()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllow) str += "0123456789"
    if(charAllow) str += "~!@#$%^&*"

    for(let i=0 ; i <= length ; i++ ){
      let char = Math.floor(Math.random() * str.length +1)

      pass += str.charAt(char)
      
    }
    setPassword(pass)
    console.log(pass);
    

  }, [length, numAllow, charAllow, setPassword])

  useEffect(() => {
    passwordGenerator()
  
  }, [length, numAllow, charAllow, passwordGenerator])


  
  return (
    <>
    <div className='w-full max-w-md bg-slate-400 p-4 rounded-md'>
      <h1 className='text-center text-2xl my-3 '>Password Generator</h1>

      <div className='flex rounded-lg overflow-hidden'>
        <input
         type="text" 
         value={password}
         className='w-full outline-none bg-neutral-700 py-1 px-3 '
         placeholder='Password'
         readOnly
         ref={passwordRef}
         />
         <button 
         onClick={copyPassword}
         className='outline-none bg-blue-700 text-white px-3 py-1'
         >Copy</button>
       </div>

       <div className='flex text-sm gap-x-4 my-3' >
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)} }
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={numAllow}
          id='numInput'
          onChange={()=> {setNumAllow((prev) => !prev)} }
          />
          <label>Numbder</label>
        </div>

        <div className="flex items-center gap-x-1">
        <input 
          type="checkbox"
          defaultChecked={charAllow}
          id='numInput'
          onChange={()=> {setCharAllow((prev) => !prev)} }
          />
          <label>Character</label>
        </div>
       </div>
    </div>

<Navvbar/>
    </>
  )
}

export default App
