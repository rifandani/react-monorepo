import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useRafInterval } from '@react-monorepo/core/src/hooks/use-raf-interval.hook'
import { Button, type ButtonVariantProps } from '@react-monorepo/rrouter/src/core/components/ui/button'
import { useI18n } from '@react-monorepo/rrouter/src/core/hooks/use-i18n.hook'
import { shuffle } from 'radashi'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Clock } from './clock'

const currentDate = new Date()

export function HomeClock() {
  const [t] = useI18n()
  const navigate = useNavigate()
  const [parentRef] = useAutoAnimate()
  const [time, setTime] = useState(currentDate)
  const [showClock, setShowClock] = useState(true)
  const [buttons, setButtons] = useState([
    {
      id: 'sort',
      variant: 'default' as ButtonVariantProps['variant'],
      text: 'sortButtons',
    },
    {
      id: 'clock',
      variant: 'secondary' as ButtonVariantProps['variant'],
      text: 'toggleClock',
    },
    {
      id: 'start',
      variant: 'outline' as ButtonVariantProps['variant'],
      text: 'getStarted',
    },
  ] as const)

  // recalculate `seconds` every 1_000 ms
  useRafInterval(
    () => {
      if (showClock)
        setTime(new Date())
    },
    1_000,
    { immediate: true },
  )

  return (
    <>
      {showClock && (
        <section aria-label="clock ticking in svg" className="mt-8">
          <Clock
            seconds={time.getSeconds()}
            minutes={time.getMinutes()}
            hours={time.getHours()}
          />
        </section>
      )}

      <section
        ref={parentRef}
        className="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-3"
      >
        {buttons.map(btn => (
          <Button
            type="button"
            aria-label={`${btn.id} button`}
            id={btn.id}
            key={btn.id}
            variant={btn.variant}
            onPress={() => {
              if (btn.id === 'sort')
                setButtons(prev => shuffle(prev) as unknown as typeof prev)
              else if (btn.id === 'clock')
                setShowClock(prev => !prev)
              else navigate('/todos')
            }}
          >
            {t(btn.text)}
          </Button>
        ))}
      </section>
    </>
  )
}
