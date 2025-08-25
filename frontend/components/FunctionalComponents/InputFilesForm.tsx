import React, { useRef,useState,useEffect} from "react";
import { Button } from "../ui/button";
import { InputFilesFormProps } from "@/datatypes";
import { uploadScript,checkScript,fetchTaskScript,checkTask, updateScriptsConnection } from "../functions/fetching";
import { urlCreatorfunction } from "../functions/functionalities";

const InputFilesForm = (props:InputFilesFormProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [exists,setExists]=useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(true);
  const [url,setUrl]=useState<string|null>(null);
  const [file,setFile]=useState<File|null>(null);
  const [filemodified,setFileModified]=useState<boolean>(false);

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

  if(loading){return <div>Loading ....</div>}



  return (
      <div className="w-10 h-10 relative my-2">
          <input
            type="file"
            className="absolute left-[999999px]"
            ref={ref}
            onChange={(e)=>{inputChange(e);setFileModified(true);}}
          />
          { exists &&
          <a href={url as string} download={true}>
          <div className="w-10 h-5 bg-blaack text-white rounded-2xl">
            View
          </div>
          </a>
          }
          <Button className="my-2"
            onClick={() => {
              ref.current?.click();
            }}
          >
            +
          </Button>
          { file && props.scriptModified &&  ! filemodified &&
          <Button
          onClick={()=>{
            alert('Only task button clicked')
            const updatingfunction=async()=>{
              const taskExists=await checkTask(props.task_id);
              if(taskExists){
                await updateScriptsConnection(props.task_id,props.filename,props.exe_order,props.filename);
                props.setScriptModified(false);
              }
              else{alert('First Update Task Details in order to create scripts');}
            };
            updatingfunction();
          }}
          > Button when only script details is modified </Button>
          }
          {
            file && filemodified &&
            <Button
            onClick={()=>{
              alert('All button clicked')
              const scriptupdatingfunction=async()=>{
                const taskExists=await checkTask(props.task_id);
                if(taskExists){
                  await updateScriptsConnection(props.task_id,props.filename,props.exe_order,props.filename);
                  const tempUrl=await uploadScript(props.task_id,props.filename,file);
                  setUrl(tempUrl);
                  props.setScriptModified(false);
                  setFileModified(false);
                }
                else{alert('First Update Task Details in order to create scripts');}
              };
              scriptupdatingfunction();
            }}  
            > Button when all are modified </Button>
          }
        
      </div>
  );
};

export default InputFilesForm;