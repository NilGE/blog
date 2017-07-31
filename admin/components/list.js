import React from 'react';
import {Link} from 'react-router';

const List = ({posts}) => {
  return (
    <div>
      {posts.map(post =>
        <article className="post" key={post._id}>
          <div className="post-header">
              <h3 className="post-title">
                <Link to={{ pathname: '/admin/editor', query: {post: post._id} }}>
                      {post.title}
                </Link>
              </h3>
          </div>
          <div className="post-snippet">
              <p>{post.subtitle}</p>
          </div>
          <div className="post-meta">
              <Link to="/contact">{post.author}</Link> on
                {post.tags.map(tag =>
                  <Link key={tag._id} to={{ pathname: '/tagList', query: {tag: tag._id, tagName: tag.name} }} > {tag.name} | </Link>
                )} <time>{post.datetime}</time>
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
