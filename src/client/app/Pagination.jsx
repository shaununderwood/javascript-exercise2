import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const { length, pageLength, currentPage, onChange } = this.props;
    let extraPage = (length % pageLength > 0 ? 1 : 0);
    let numberOfPages = Math.floor(length / pageLength) + extraPage;
    let pageButtons = [];
    for (var i = 0; i < numberOfPages; i++) {
      let className = 'page-item ' + (currentPage === i ? 'active' : '');
      pageButtons.push(<li key={i} className={className} onClick={onChange}><a className="page-link" name="pageButton" id={i} >{i + 1}</a></li>);
    }

    if (numberOfPages === 0) {
      return '';
    }

    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {/* <li className="page-item" onClick={onChange}>
              <a className="page-link" name="pageButton" id="previous" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li> */}
            {pageButtons}
            {/* <li className="page-item" onClick={onChange}>
              <span className="page-link" name="pageButton" id="next" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </span>
            </li> */}
          </ul>
        </nav>

      </div >
    );
  }
}

export default Pagination;