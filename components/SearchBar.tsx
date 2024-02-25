"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchManufacturer } from ".";
import Image from "next/image";

const SearchBar = () => {
    const [manufacture,setManufacture]=useState("");
    const router =useRouter();
 
const SearchButton =({otherClasses}:{otherClasses:string}) =>(
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image 
    src ="magnifying-glass.svg"
    alt="magniying glass"
    width={40}
    height={40}
    className="object-contain"

    />

  </button>
)
const [model,setModel]=useState("");
   // const useState ()
const handlesearch = (e:React.FormEvent<HTMLFormElement>) =>{

e.preventDefault ();

if(manufacture ==="" && model === ""){ 
return alert ("please fill in the search bar");
}
updateSearchParams(
  model.toLocaleLowerCase(),
   manufacture.toLocaleLowerCase())
}

const updateSearchParams = (model:string, manufacture:string) =>{


const searchParams = new URLSearchParams(window.location.search);


if(model){
  searchParams.set('model',model)
}else {
  searchParams.delete("model")
}
if(model){
  searchParams.set('manufacturer',manufacture)
}else {
  searchParams.delete("manufacture")
}

const newPathname = `${window.location.pathname}?
 ${searchParams.toString()}`
 router.push(newPathname)

}

return (
   <form className ="searchbar" onSubmit =
   {handlesearch}>
    <div className="searchbar__items">
      <SearchManufacturer 
      manufacturer ={manufacture}
      setManufacturer={setManufacture}
      />
      <SearchButton otherClasses="sm:hidden"/>
    </div>
<div className="searchbar__item">
<Image
src="/model-icon.png"
width={25}
height={25}
className="absolute w-[20px] h-[20px] ml-4"
alt="car model"
/>
<input 

type="text"
name="model"
value={model}
onChange={(e)=>setModel(e.target.value)}
placeholder="Tiguan"
className="searchbar__input"

/>
<SearchButton otherClasses="sm:hidden"/>
</div>
<SearchButton otherClasses="max-sm:hidden"/>
   </form>
  )
}

export default SearchBar
