import React from "react";
import "./Users.scss";
import { connect } from "react-redux";

import { ReactComponent as UserSvg } from "../../svg/user.svg";
import { ReactComponent as File } from "../../svg/file.svg";
let mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

function Users(props) {
  return (
    <div className={"user-icon"}>
      {props.userIdArray ? (
        <div className={"user-icon-txt"}>
          {props.userIdArray.substring(0, 1)}
        </div>
      ) : (
        <UserSvg />
      )}
    </div>
  );
}

export default connect(mapStateToProps)(Users);
