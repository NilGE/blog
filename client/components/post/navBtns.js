import React from 'react'

const NavBtns = ({skip, limit, total, handleClickNewerPost, handleClickOlderPost}) => {
  const newerPostBtn = (
    <button onClick={handleClickNewerPost} className="btn btn-secondary float-left">&larr; Newer Posts</button>
  );
  const orderPostBtn = (
    <button onClick={handleClickOlderPost} className="btn btn-secondary float-right">Older Posts &rarr;</button>
  );
  return (
    <div className="clearfix">
      { skip == 0 ? '' : newerPostBtn }
      { skip + limit >= total ? '' : orderPostBtn }
    </div>
  )
}

NavBtns.propTypes = {
  skip: React.PropTypes.number.isRequired,
  limit: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired,
  handleClickNewerPost: React.PropTypes.func.isRequired,
  handleClickOlderPost: React.PropTypes.func.isRequired
};

export default NavBtns;
