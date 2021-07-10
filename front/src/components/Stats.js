import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VictoryPie } from 'victory'
import { getGeneral } from '../reducers/linkDataReducer'

export const Stats = () => {
  const [focusedLink, setFocusedLink] = useState('')
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 })
  const [focusedTimeoutID, setFocusedTimeoutID] = useState()

  const linkData = useSelector(state => state.linkData)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGeneral())
  }, [dispatch])

  const cursorTextStyle = (focusedLink === '')
    ? { display: 'none' }
    : {
      position: 'absolute',
      backgroundColor: 'blue',
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

  return(
    <div style={{ width: '30vw' }} onMouseMove = {handleMouseMove}>
      <table>
        <thead>
          <tr>
            <th>Destination URL</th>
            <th>Shortened</th>
            <th>Total Visits</th>
          </tr>
        </thead>
        <tbody >
          {
            (linkData !== undefined) &&
             linkData.map(link => <tr key={link.id}>
               <td><a target='_blank' href={link.destURL} rel="noreferrer">
                 {link.destURL}</a></td>
               <td><a target='_blank' href={`localhost:3001/links/${link.id}`} rel="noreferrer">
                 {`localhost:3001/links/${link.id}`}</a></td>
               <td>{link.visits}</td>
             </tr>)

          }
        </tbody>
      </table>
      <div onMouseLeave={handleMouseLeave}>
        <VictoryPie
          data = { (linkData !== undefined)
            ? linkData.map(e => ({
              shortened: `${e.destURL.split('/')[2]}/...`,
              fullURL: e.destURL,
              visits: e.visits
            }))
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