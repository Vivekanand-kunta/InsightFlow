import React, { useRef,useState,useEffect} from "react";
import { Button } from "../ui/button";
import { InputFilesFormProps } from "@/datatypes";
import { uploadScript,checkScript,fetchTaskScript } from "../functions/fetching";
import { urlCreatorfunction } from "../functions/functionalities";

const InputFilesForm = (props:InputFilesFormProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [exists,setExists]=useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(true);
  const [url,setUrl]=useState<string|null>(null);
  const [file,setFile]=useState<File|null>(null);
  
  useEffect(()=>{
    const initFunction=async()=>{
      const oldFile=await checkScript(props.task_id,props.filename)
      if(oldFile){
        setExists(true);
        const tempUrl=await fetchTaskScript(props.task_id,props.filename);
        setUrl(tempUrl);
        setLoading(false)
      }
      else{
        setLoading(false)
      }
    };

    initFunction();
  },[])

  const inputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const tempFile = e.target.files[0];
    setFile(tempFile);
    const tempUrl=urlCreatorfunction(tempFile);
    setUrl(tempUrl);
    setExists(true);
  };

  const submitFile=async()=>{
    const res=await uploadScript(props.task_id,props.filename,file as File);
  }

  if(loading){return <div>Loading ....</div>}



  return (
      <div className="w-10 h-10 relative">
          <input
            type="file"
            className="absolute left-[999999px]"
            ref={ref}
            onChange={inputChange}
          />
          { exists &&
          <a href={url as string} download={true}>
          <div>
            View
          </div>
          </a>
          }
          <Button
            onClick={() => {
              ref.current?.click();
            }}
          >
            +
          </Button>
          <Button onClick={()=>{submitFile();}}>
            Submit
          </Button>
      </div>
  );
};

export default InputFilesForm;