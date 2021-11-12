import React from "react";
import "./GetUsers.scss";
import { connect } from "react-redux";
import Users from "../Users";

let mapStateToProps = state => {
  return {
    users: state.users.users,
  };
};
function GetUsers({users, projectUsers}) {
  return (
    <div className="users-wrapper">
      {projectUsers &&
      projectUsers.map(usersId => (
        <div key={`${Math.random()}${usersId}`}>
          {users.map(
            user =>
              user.id === usersId && (
                <div
                  key={user.id}
                  className="users-wrapper__item"
                >
                  <Users
                    userIdArray={user.name.substring(0, 1)}
                  />
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
}

export default connect(mapStateToProps)(GetUsers);
