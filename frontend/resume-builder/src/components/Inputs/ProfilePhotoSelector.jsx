// import React , {useRef,useState,useEffect} from 'react'
// import {LuUser,LuUpload,LuTrash} from "react-icons/lu";

// const ProfilePhotoSelector =({image,setImage,preview,setPreview})=>{

//     const inputRef=useRef(null);
//     const [previewUrl,setPreviewUrl]=useState(null);
//     const [showInput, setShowInput] = useState(false);//New for "Form not connected warning"


//     const handleImageChange=(event)=>{         

//       const file=event.target.files[0];
//       if(file){
//         //Update the image state
//         setImage(file);

//         //Generate preview URL from the file
//         const preview=URL.createObjectURL(file);
//         if(setPreview){
//             setPreview(preview)
//         }
//         setPreviewUrl(preview);
//       }
//     };

//     const handleRemoveImage=()=>{
//         setImage(null);
//         setPreviewUrl(null);

//         if(setPreview){
//             setPreview(null);
//         }
//     };


//     // const onChooseFile=()=>{
//     //     setShowInput(true);//New for "Form not connected warning"
//     //     inputRef.current.click();
//     // };
//     const onChooseFile = () => {
//        setShowInput(true);
//     };

//     useEffect(() => {
//        if (showInput && inputRef.current) {
//            inputRef.current.click();
//         }
//     }, [showInput]);


//     return (
//         <div className="flex justify-center mb-10">
//             {/* <input 
//               type="file"
//               accept="image/*"
//               ref={inputRef}
//               onChange={handleImageChange}
//               className="hidden"
//             /> */}
//             {showInput && (
//               <input
//               type="file"
//               accept="image/*"
//               ref={inputRef}
//               onChange={handleImageChange}
//               className="hidden"
//              />
//             )}
            

//             {!image? (
//                 <div className="w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative cursor-pointer">
//                    <LuUser className="text-4xl text-purple-500"/>

//                     <button 
//                     type="button"
//                     className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
//                     onClick={onChooseFile}
//                     >
//                         <LuUpload/>
//                         </button>
//                     </div>
//                     ):(
//                         <div className="relative">
//                             <img
//                               src={preview || previewUrl}
//                               alt="profile photo"
//                               className="w-20 h-20 rounded-full object-cover"
//                               />
//                             <button
//                             type="button"
//                             className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
//                             onClick={handleRemoveImage}
//                             >
//                         <LuTrash/>
//                     </button>
//                 </div>
//                     )}
//                 </div>
//             )}

// export default ProfilePhotoSelector;













import React , {useRef,useState,useEffect} from 'react'
import {LuUser,LuUpload,LuTrash} from "react-icons/lu";

const ProfilePhotoSelector =({image,setImage,preview,setPreview})=>{

    const inputRef=useRef(null);
    const [previewUrl,setPreviewUrl]=useState(null);
    const [showInput, setShowInput] = useState(false);

    const handleImageChange=(event)=>{         
      const file=event.target.files[0];
      if(file){
        setImage(file);
        const preview=URL.createObjectURL(file);
        if(setPreview){
            setPreview(preview)
        }
        setPreviewUrl(preview);
      }
    };

    const handleRemoveImage=()=>{
        setImage(null);
        setPreviewUrl(null);
        if(setPreview){
            setPreview(null);
        }
    };

    const onChooseFile = () => {
       setShowInput(true);
    };

    useEffect(() => {
       if (showInput && inputRef.current) {
           inputRef.current.click();
        }
    }, [showInput]);

    return (
        <div className="flex justify-center mb-10">
            {showInput && (
              <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
              className="hidden"
             />
            )}
            
            {!image? (
                <div className="w-24 h-24 flex items-center justify-center bg-purple-50 rounded-full relative cursor-pointer">
                   <LuUser className="text-5xl text-purple-500"/>

                    <button 
                    type="button"
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
                    onClick={onChooseFile}
                    >
                        <LuUpload className="text-lg"/>
                    </button>
                </div>
            ):(
                <div className="relative">
                    <img
                      src={preview || previewUrl}
                      alt="profile photo"
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-100"
                    />
                    <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-lg transition-all"
                    onClick={handleRemoveImage}
                    >
                        <LuTrash className="text-lg"/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector;