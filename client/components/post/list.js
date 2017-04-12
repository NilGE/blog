import React from 'react';
import {Link} from 'react-router';
import dateFormatter from '../../../server/shared/dateformatter';

const List = ({posts}) => {
  return (
    <div>
      {posts.map(post =>
        <div key={post._id}>
          <div className="post-preview" >
              <Link to={{ pathname: `/post/${post._id}` }}>
                  <h2 className="post-title">
                      {post.title}
                  </h2>
                  <h3 className="post-subtitle">
                      {post.subtitle}
                  </h3>
              </Link>
              <p className="post-meta">
                <Link to="/contact">{post.author}</Link> on
                  {post.tags.map(tag =>
                    <Link key={tag._id} to={{ pathname: '/tagList', query: {tag: tag._id} }} > {tag.name} </Link>
                  )} - {dateFormatter(post.date)}
              </p>
          </div>
          <hr />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  posts: React.PropTypes.array.isRequired
};

export default List;
