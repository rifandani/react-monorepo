import type { RadioGroupState } from 'react-stately'
import { createContext } from 'react'

export const RadioContext = createContext<RadioGroupState | null>(null)
