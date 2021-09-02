import React from "react";
import "./ModalWindow.scss";

import Button from "../Button";
import {
  deleteTask,
  sendTask,
  updateTasks
} from "../../redux/projects-reducer";
import { connect } from "react-redux";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import { deleteMessagePassword } from "../../redux/profile-reducer";

let mapStateToProps = state => {
  return {
    state: state.main,
    user: state.users.profile,
    users: state.users.users
  };
};

function ModalWindow(props) {
  return (
    <div>
      <div
        className="bg-close modal-project-bg"
        onClick={() => props.setActive(false)}
      >
        <div className="modal-project" onClick={e => e.stopPropagation()}>
          <div className="modal-project__header">
            <div />
            <Closed
              onClick={() =>
                props.setActive(false) && props.deleteMessagePassword()
              }
            />
          </div>
          <div className="add-item">{props.txt}</div>
          <div
            onClick={() =>
              props.setActive(false) && props.deleteMessagePassword()
            }
          >
            <Button text="Готово" type="add-task" color="blue" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {
  sendTask,
  updateTasks,
  deleteTask,
  deleteMessagePassword
})(ModalWindow);
