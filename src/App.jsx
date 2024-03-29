import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
   const [length,setlength] = useState(8);
   const [numberallowed,setnumberallowed] = useState(false);
   const[charallowed,setcharallowed] = useState(false);
   const[pass,setpass]= useState("");
   const [buttonText, setButtonText] = useState('Copy');

   const handleCopy =  () => {
    
      navigator.clipboard.writeText(pass);
      ref.current?.select();
      setButtonText('Copied');

  };

   const password = useCallback(()=>{
       let password = "";
       let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
       if(numberallowed) str += "0123456789";
       if(charallowed) str += "~!@#$%^&*(){}:|";

       for(let a=1;a<=length;a++)
       {
          password += str.charAt(Math.floor((Math.random()*str.length+1)));
       }
       //console.log(password);
       setpass(password);


   },[length,numberallowed,charallowed,setpass])

   const ref = useRef(null);

   useEffect(()=>{
        password();
        setButtonText("Copy")
       // handleCopy();
   },[length,numberallowed,charallowed,password])

  return (
    <>
    <div className='w-full rounded-lg justify-center align-middle mx-auto max-w-md text-white bg-slate-600 my-48 px-3 py-8'>
    <h1 className='text-white text-center m-1'>Password Generator</h1>

    <div className=' flex rounded-lg  mb-4 overflow-hidden shadow-lg '>
      <input
       type='text'
       value={pass}
       placeholder=' Pasword'
       className='rounded-full outline-none py-1 px-3 w-full m-4 text-black'
       readOnly
       ref={ref}
       />
      <button onClick={handleCopy} className=' outline-none bg-orange-300 text-black px-3 py-0.5 shrink-0'>{buttonText}</button>
     </div>
     <div className='flex p-2'>
      <input
      type='range'
      value={length}
      minLength={8}
      maxLength={30}
      className=' cursor-pointer px-1 mx-2'
      onChange={(e)=>{
            setlength(e.target.value)
      }}

      />
      <label className='text-orange-400 '>Length:{length}</label>
      <div className='flex'>
        <input 
         type='checkbox'
         defaultChecked={numberallowed}
         id='numberinput'
         className='mx-1'
         onChange={()=>{
          setnumberallowed((prev)=>{
            return !prev;
          })
         }}
        />
        <label className=' text-orange-400'>Numbers</label>
      </div>
      <div className='flex'>
        <input 
         type='checkbox'
         defaultChecked={charallowed}
         id='charinput'
         className='mx-1'
         onChange={()=>{
          setcharallowed((prev)=>{
            return !prev;
          })
         }}
        />
        <label className='text-orange-400'>Characters</label>
      </div>
         
     </div>
    </div>
     
    </>
  )
}

export default App
