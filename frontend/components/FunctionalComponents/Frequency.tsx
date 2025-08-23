import React from 'react'
import { FrequencyProps } from '@/datatypes';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const Frequency = (props:FrequencyProps) => {
  return (
    <Select
    defaultValue={props.frequency || 'daily'}
    onValueChange={(value)=>props.setFrequency(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frequency</SelectLabel>
          <SelectItem value="hourly">Hourly</SelectItem>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Frequency
