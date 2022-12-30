import { useState } from 'react'
import { GoChevronDown, GoChevronLeft } from 'react-icons/go'

export const ExpandablePanel = ({ header, children }) => {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded((prevState) => !prevState)
  }
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex items-center justify-between">{header}</div>
        <div className="cursor-pointer" onClick={handleClick}>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded ? <div className="p-2 border-t">{children}</div> : null}
    </div>
  )
}
