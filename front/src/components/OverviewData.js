import React, { useState, useMemo } from 'react'
import { VictoryPie, VictoryTheme } from 'victory'
import PropTypes from 'prop-types'

export const OverviewData = ({ linkData }) => {
  const [focusedLink, setFocusedLink] = useState('')
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 })
  const [focusedTimeoutID, setFocusedTimeoutID] = useState()

  const convertData = (links) => {
    return links.filter(link => link.visits > 0).map(e => ({
      shortened: `${e.destURL.split('/')[2]}/...`,
      fullURL: e.destURL,
      visits: e.visits
    }))
  }

  const convertedData = useMemo(() => convertData(linkData), [linkData])

  const cursorTextStyle = (focusedLink === '')
    ? { display: 'none' }
    : {
      position: 'absolute',
      backgroundColor: 'grey',
      left: `${mouseCoordinates.x}px`,
      top: `${mouseCoordinates.y}px`
    }

  const handleMouseMove = (e) => {
    if(focusedLink !== ''){
      setMouseCoordinates({ x: e.pageX, y: e.pageY })
    }
  }

  const handleMouseEnter = () => {
    clearTimeout(focusedTimeoutID)
  }

  const handleMouseLeave = () => {
    clearTimeout(focusedTimeoutID)
    const newTimeoutID = setTimeout(() => setFocusedLink(''), 100)
    setFocusedTimeoutID(newTimeoutID)
  }

  return (
    <div>
      <div onMouseMove = {handleMouseMove} onMouseLeave={handleMouseLeave}>
        <VictoryPie
          theme={VictoryTheme.material}
          data = { (linkData !== undefined)
            ? convertedData
            : []}
          x = 'shortened'
          y = 'visits'
          events = {[
            {
              target: 'data',
              eventHandlers: {
                onMouseEnter: () => {
                  handleMouseEnter()
                  return [
                    {
                      target: 'data',
                      mutation: (props) => {
                        const fullURL = props.datum.fullURL
                        setFocusedLink(fullURL)
                      }
                    }
                  ]
                }
              },
            }
          ]}
        />
      </div>
      <div style = {cursorTextStyle} >
        <p>
          {focusedLink}
        </p>
      </div>
    </div>
  )
}

OverviewData.propTypes = {
  links: PropTypes.array.isRequired
}