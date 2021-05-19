import React from "react";
import "./Users.scss";
import { connect } from "react-redux";
let mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

function Users(props) {
  return (
    <>
      {props.userIdArray &&
        props.userIdArray.slice(0, props.count).map(usersId => (
          <div key={`${Math.random()}${usersId}`}>
            {props.users.map(
              user =>
                user.id === usersId && (
                  <div key={user.id} className="user-class">
                    <div className="user-icon">
                      {user.name && user.name.substring(0, 1)}
                    </div>

                    {props.userName && (
                      <div className={`user-name__size-${props.size}`}>
                        &ensp;{user.name}&ensp;
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        ))}
      {props.more && props.userIdArray.length > props.more && (
        <div className="more-user">{`+${props.userIdArray.length -
          props.more}`}</div>
      )}
    </>
  );
}

export default connect(mapStateToProps)(Users);
