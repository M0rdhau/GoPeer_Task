import React from 'react'

export const DetailsTable = ({ linkData }) => {
  return (
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
  )
}