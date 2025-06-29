import { ReactNode } from "react"

const SwithcContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col py-1">{children}</div>
}
export default SwithcContainer
