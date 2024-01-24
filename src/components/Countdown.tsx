'use client'

import React, { useEffect, useState } from 'react'
import ReactCountdown, { CountdownRendererFn } from 'react-countdown'
import CountdownRenderer from './CountdownRenderer'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const STATE_NOT_STARTED = 'STATE_NOT_STARTED',
  STATE_STARTED = 'STATE_STARTED',
  STATE_ENDED = 'STATE_ENDED',
  STATE_LOADING = 'STATE_LOADING'

interface CountdownProps {
  startDateTime: Date
  endDateTime: Date
}

const Countdown = (props: CountdownProps) => {
  const [currentState, setCurrentState] = useState(STATE_LOADING)
  const router = useRouter()

  const countdown: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
  }) => {
    return (
      <CountdownRenderer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    )
  }

  useEffect(() => {
    router.refresh()
  }, [])

  useEffect(() => {
    if (currentState === STATE_ENDED) {
      return
    }
    const start = moment(props.startDateTime)
    const end = moment(props.endDateTime)

    const interval = setInterval(async () => {
      const now = moment()

      if (now.isBefore(start)) {
        setCurrentState(STATE_NOT_STARTED)
      } else if (now.isAfter(start) && now.isBefore(end)) {
        setCurrentState(STATE_STARTED)
      } else if (now.isAfter(end)) {
        setCurrentState(STATE_ENDED)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [props.startDateTime, props.endDateTime, currentState])

  return (
    <div className=" mt-10 text-center">
      {currentState === STATE_LOADING && <>loading...</>}
      {currentState === STATE_NOT_STARTED && (
        <div>
          <p>Vote will begin in: </p>
          <ReactCountdown date={props.startDateTime} renderer={countdown} />
        </div>
      )}
      {currentState === STATE_ENDED && (
        <span className="bg-zinc-100 px-3 py-1 text-lg font-medium">
          Votes Ended
        </span>
      )}
      {currentState === STATE_STARTED && (
        <div>
          <span>Vote now :</span>
          <ReactCountdown date={props.endDateTime} renderer={countdown} />
        </div>
      )}
    </div>
  )
}

export default Countdown
