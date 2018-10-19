import React from 'react';

const SearchBox = ({ ChangeField, AlphabeticOrder }) => {
  return(
    <div>
      <input
        className="pa3 ba b--green bg-lightest-blue "
        type="search"
        name="robot"
        placeholder="search robot"
        onChange={ChangeField}
      />
      <h4>
        In Ascending Alphabetical Order ?
      </h4>
      <input
        type="checkbox"
        name="checked"
        onClick={AlphabeticOrder}
      />
    </div>
  )
}

export default SearchBox;
