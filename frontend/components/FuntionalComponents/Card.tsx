import React from 'react'
import Logs from './Logs'
import Link from 'next/link'
type Log={
  time:string;
  status: "failure" | "success"
}

type props={
  props:{title:string;
    task_id:string;
    creation_time:string;
    schedule_freq:string;
    logs:Log[]}
}
const Card = ({ props }: props) => {
  return (
    <Link href={props.task_id}>
      <div className="min-w-[275px] max-w-[400px] min-h-[325px] max-h-[400px] bg-gray-200 flex flex-col">
        <div className="flex-[0.4] flex flex-col justify-between p-3">
          <div className="text-lg font-bold">{props.title}</div>
          <div>Created at: {props.creation_time}</div>
          <div>Frequency: {props.schedule_freq}</div>
        </div>
        <div className="flex-[0.6] overflow-y-auto">
          <Logs logs={props.logs} />
        </div>

      </div>
    </Link>
  );
};


export default Card
