import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  type Props = {
    schedule: string
    setSchedule: React.Dispatch<React.SetStateAction<string>>
  }
  
  const Schedule = ({ schedule, setSchedule }: Props) => {
    return (
      <div className="mt-10 flex justify-between align-center">
        <div>
          <h3 className="font-bold text-2xl">Schedule</h3>
        </div>
        <div className="w-[40vw]">
          <Select
            value={schedule} // highlight current selection
            onValueChange={setSchedule} // update state
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Scheduling Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quaterly">Quaterly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }
  
  export default Schedule
  