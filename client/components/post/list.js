import React from 'react';
import {Link} from 'react-router';
import dateFormatter from '../../../server/shared/dateformatter';

const List = ({posts}) => {
  return (
    <div>
      {posts.map(post =>
        <article className="post" key={post._id}>
          <div className="post-header">
              <h2 className="post-title">
                <h2 className="post-title">
                  <Link to={{ pathname: `/post/${post._id}` }}>
                        {post.title}
                  </Link>
                </h2>
              </h2>
          </div>
          <div className="post-snippet">
              <p>{post.subtitle}</p>
          </div>
          <div className="post-meta">
              <img className="author-thumb" src="img/avatar.JPG" alt="Nilge" />
              <Link to="/contact">{post.author}</Link> on
                {post.tags.map(tag =>
                  <Link key={tag._id} to={{ pathname: '/tagList', query: {tag: tag._id, tagName: tag.name} }} > {tag.name} | </Link>
                )} <time>{dateFormatter(post.date)}</time>
          </div>
        </article>
      )}
    </div>
  )
}

List.propTypes = {
  posts: React.PropTypes.array.isRequired
};

export default List;
