import React from 'react'

const Filter = (props) => {
  const {handleChange} = props
  return (
    <div className="filterDiv">
      <label htmlFor="filter">Filter:</label>
      <select name="filter" id="filter" onChange={handleChange}>
        <option value="All">All</option>
        <option value="Hard Candy">Hard Candy</option>
        <option value="Chocolate">Chocolate</option>
        <option value="Fruity">Fruity</option>
        <option value="Gummy">Gummy</option>
        <option value="Holiday">Holiday</option>
        <option value="Chewy">Chewy</option>
      </select>
    </div>
  )
}

export default Filter
