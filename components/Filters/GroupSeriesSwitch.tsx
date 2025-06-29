import { Dispatch, SetStateAction } from "react"
import { FilterProps } from "."
import OnOffSwitch from "../OnOffSwitch"
import SwithcContainer from "./SwitchContainer"

interface Props extends FilterProps {
  grouped: boolean
  setGrouped: Dispatch<SetStateAction<boolean>>
}

const GroupSeriesSwitch = ({ query, setQuery, grouped, setGrouped }: Props) => {
  const handleChange = () => {
    setGrouped(!grouped)
    setQuery({ ...query, grouped: !grouped })
  }

  return (
    <SwithcContainer>
      <label className="text-sm font-medium text-gray-400 px-2">Group</label>

      <OnOffSwitch checked={grouped} onChange={handleChange} />
    </SwithcContainer>
  )
}

export default GroupSeriesSwitch
