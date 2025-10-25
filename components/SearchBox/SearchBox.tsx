import type { DebouncedState } from "use-debounce"
import css from "./SearchBox.module.css"

interface SearchBoxProps{
  onChange:(value: string) => void
  value:string
}


export default function SearchBox({onChange, value}:SearchBoxProps) {
 
  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value)
  }
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={value}
      onChange={handleChange}
    />
  )
}