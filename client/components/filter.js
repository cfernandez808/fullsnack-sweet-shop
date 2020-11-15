import React from 'react'

const Filter = (props) => {
  const {handleChangeCategory, handleChangePrice} = props
  return (
    <div className="filterDiv">
      <div className="singleFilter">
        <label htmlFor="filter">Filter By Category:</label>
        <select name="filter" id="filter" onChange={handleChangeCategory}>
          <option value="All">All</option>
          <option value="Hard Candy">Hard Candy</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Fruity">Fruity</option>
          <option value="Gummy">Gummy</option>
          <option value="Holiday">Holiday</option>
          <option value="Chewy">Chewy</option>
        </select>
      </div>
      <div className="singleFilter">
        <label htmlFor="filterPrice">Filter By Price:</label>
        <select name="filter" className="filter" onChange={handleChangePrice}>
          <option value="All">All</option>
          <option value="99">under $1</option>
          <option value="199">$1-$2</option>
          <option value="299">$2-$3</option>
          <option value="399">$3-$4</option>
          <option value="499">$4-$5</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
