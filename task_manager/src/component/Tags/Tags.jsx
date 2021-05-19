import React from "react";
import "./Tags.scss";
import { connect } from "react-redux";

let mapStateToProps = state => {
  return {
    color: state.main.color,
    tags: state.main.tags
  };
};
function Tags(props) {
  return <div className="tags">tag</div>;
}
export default connect(mapStateToProps)(Tags);
