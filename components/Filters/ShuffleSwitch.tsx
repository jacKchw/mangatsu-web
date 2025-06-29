import { useState } from "react"
import { FilterProps } from "."
import OnOffSwitch from "../OnOffSwitch"
import SwithcContainer from "./SwitchContainer"

const ShuffleSwitch = ({ query, setQuery }: FilterProps) => {
  const [checked, setChecked] = useState(true)

  const handleChange = (checked: boolean) => {
    setChecked(checked)
    const seed = checked ? Math.floor(Math.random() * 2147483648) : undefined
    setQuery({ ...query, seed })
  }

  return (
    <SwithcContainer>
      <label className="text-sm font-medium text-gray-400 px-2">Shuffle</label>
      <OnOffSwitch checked={checked} onChange={handleChange} />
    </SwithcContainer>
  )
}

export default ShuffleSwitch
