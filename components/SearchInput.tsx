import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Input
        id="searchStyle"
        placeholder="Search Styles..."
        className="px-3 pb-2 ps-8 pe-2 rounded-xl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <Search className="h-4 w-4" />
      </div>
    </div>
  )
}
