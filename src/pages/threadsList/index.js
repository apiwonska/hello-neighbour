import React from 'react';
import { connect } from 'react-redux';

import { fetchCategory } from '../../redux/actions';
import { 

} from './style.js';

class ThreadsList extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.categoryId)
  }

  renderThreadsList() {
    const threadsList = this.props.category.threads.map(thread => {
      return (
        <div key={thread.id}>
          <h5>{ thread.title }</h5>
          <span>mesg: 10</span>
          <span>Added: { thread.created }</span>
          <span>Last post: { thread.updated }</span>
        </div>
      )
    })
    return threadsList;
  }

  render() {
    if(!Object.keys(this.props.category).length) {
      return <div>Loading...</div>
    }

    return (
    <div>
      <h2>{this.props.category.name}</h2>
      <button>Add Thread</button>
      <div>
        { this.renderThreadsList() }
      </div>      
    </div>
  )
  }  
}

const mapStateToProps = state => {  
  return {
    category: state.category
  }
}

export default connect(mapStateToProps, {fetchCategory})(ThreadsList);