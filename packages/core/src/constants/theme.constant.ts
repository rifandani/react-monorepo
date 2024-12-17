export type Theme = 'auto' | 'light' | 'dark'

export const themes: Theme[] = ['auto', 'light', 'dark']

// object version of `themes`
export const modes = themes.reduce(
  (acc, item) => {
    acc[item] = item
    return acc
  },
  {} as Record<Theme, Theme>,
)
