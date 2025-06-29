import { useEffect, useState } from "react"
import { FilterProps } from "."
import { getValue, LocalPreferences } from "../../lib/localStorage"
import OnOffSwitch from "../OnOffSwitch"
import SwithcContainer from "./SwitchContainer"

const NSFWSwitch = ({ query, setQuery }: FilterProps) => {
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    setChecked(!getValue(LocalPreferences.NSFWPref))
  }, [])

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked)
    setQuery({ ...query, nsfwHidden: checked })
  }

  return (
    <SwithcContainer>
      <label className="text-sm font-medium text-gray-400 px-2">NSFW</label>
      <OnOffSwitch checked={checked} onChange={handleChange} />
    </SwithcContainer>
  )
}

export default NSFWSwitch
