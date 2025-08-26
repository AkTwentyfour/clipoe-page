"use client"

import React, { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"

export function FilterSelect({ options, value, onChange, placeholder }: {
  options: string[]
  value: string
  placeholder: string
  onChange: (val: string) => void
}) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val)}
    >
      <SelectTrigger className="w-max border-none rounded-full bg-popover !text-white !ps-5">
        <SelectValue placeholder={placeholder} className="!font-bold"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
