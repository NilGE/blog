import React from 'react'

const NavBtns = ({skip, limit, total, handleClickNewerPost, handleClickOlderPost}) => {
  const newerPostBtn = (
    <button onClick={handleClickNewerPost} className="btn newer-post">
      <i className="fa fa-long-arrow-left" aria-hidden="true"></i> Newer Posts
    </button>
  );
  const orderPostBtn = (
    <button onClick={handleClickOlderPost} className="btn older-post">
      Older Posts <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
    </button>
  );
  return (
    <div className="pagination">
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
