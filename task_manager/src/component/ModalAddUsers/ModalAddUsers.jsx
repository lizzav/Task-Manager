import React, { useState } from "react";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import Users from "../Users/Users";
import "./ModalAddUsers.scss";
import { connect } from "react-redux";

let mapStateToProps = state => {
  return {
    state: state.main,
    userProfile: state.users.profile,
    allUsers: state.users.users
  };
};

function ModalAddUsers({
  setAddUsers,
  propsUsers,
  users,
  setUsers,
  indx,
  isTask,
  allUsers,
  userProfile
}) {
  const closeAddTask = user => {
    setUsers(user);
    setAddUsers(false);
  };

  return (
    <div>
      <div
        className="bg-close modal-project-bg"
        onClick={() => setAddUsers(false)}
      >
        <div className="add__user__modal" onClick={e => e.stopPropagation()}>
          <div
            className="add__user__modal-closed"
            onClick={() => setAddUsers(false)}
          >
            <Closed />
          </div>

          {propsUsers.map(user => (
            <div
              className={
                !isTask
                  ? users.filter(userId => userId === user.id)[0] === user.id
                    ? "add__user__modal__item-active add__user__modal__item"
                    : "add__user__modal__item"
                  : users === user.id
                  ? "add__user__modal__item-active add__user__modal__item"
                  : "add__user__modal__item"
              }
              key={user.id}
              onClick={
                !isTask
                  ? () =>
                      indx(users, user.id) === -1
                        ? setUsers([...users, user.id])
                        : setUsers([
                            ...users.slice(0, indx(users, user.id)),
                            ...users.slice(indx(users, user.id) + 1)
                          ])
                  : () => closeAddTask(user)
              }
            >
              {isTask ? (
                allUsers.map(
                  item =>
                    item.id === user && (
                      <div className="add__user__modal__item-txt">
                        <Users userIdArray={item.name.substring(0, 1)} />
                        &nbsp;{item.name}
                        {userProfile.id === item.id && <>(Я)</>}
                      </div>
                    )
                )
              ) : (
                <div className="add__user__modal__item-txt">
                  <Users userIdArray={user.name.substring(0, 1)} />
                  &nbsp;{user.name}
                  {userProfile.id === user.id && <>(Я)</>}
                </div>
              )}

              {!isTask &&
              users.filter(userId => userId === user.id)[0] === user.id ? (
                <div className="add__user__modal__item-txt__check">
                  <Closed />
                </div>
              ) : (
                <div className="add__user__modal__item-txt__check-transparent">
                  <Closed />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ModalAddUsers);
