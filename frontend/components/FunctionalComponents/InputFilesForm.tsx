import React, { useRef } from "react";
import { Button } from "../ui/button";
import { InputFilesFormProps } from "@/datatypes";
import { uploadScript } from "../functions/fetching";

const InputFilesForm = (props:InputFilesFormProps) => {
  const ref = useRef<HTMLInputElement | null>(null);



  return (
    props.url.url? 
    (// Conatiner when there is url to click and download
    <div className="w-20 h-20"> 
    <a 
      href={props.url.url as string} 
      download 
      className="px-4 py-2 w-[100%] h-[100%] bg-blue-500 text-white rounded-lg"
    >
      Download File
    </a>
    </div>
    )
    :
    (<div className="flex items-center">
      <input 
        ref={ref} 
        type="file" 
        name={props.url.s_id} 
        className="hidden"
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const uploadedUrl = await uploadScript(
                  props.task_id,
                  props.filename,
                  e.target.files[0]
                );
                props.setUrls(prevUrls => prevUrls.map(u => 
                  u.s_id === props.url.s_id ? { ...u, url: uploadedUrl } : u
                ));
            }
        }}
      />
      <Button 
        variant="outline" 
        className="w-10 h-10 rounded-full text-lg" 
        onClick={()=>{ref.current?.click();}}
      >
        Add Script
      </Button>
    </div>)
  );
};

export default InputFilesForm;
