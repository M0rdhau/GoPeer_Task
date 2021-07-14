import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const DetailsTable = ({ linkData, removeLink }) => {

  return (
    <table id='linksDetails'>
      <thead>
        <tr>
          <th>Destination URL</th>
          <th>Shortened</th>
          <th>Total Visits</th>
          <th></th>
          <th></th>
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
               <td><Link to={`/details/${link.id}`}>Details</Link></td>
               <td><button onClick={() => removeLink(link.id)}>Delete</button></td>
             </tr>)

        }
      </tbody>
    </table>
  )
}

DetailsTable.propTypes = {
  linkData: PropTypes.array.isRequired,
  removeLink: PropTypes.func.isRequired
}