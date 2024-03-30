import React from 'react'

export const Search = () => {
  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' placeholder='Find user...'/>
        </div>
        <div className='userChat'>
            <div className='userChatInfo'>
                <span>Person</span>
            </div>
        </div>
    </div>
  )
}
export default Search