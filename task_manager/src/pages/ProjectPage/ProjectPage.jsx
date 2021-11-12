import React, { useState } from "react";

import "./ProjectPage.scss";
import "../MainPage/MainPage.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../component/Button";
import ModalAddProject from "../../component/ModalAddProject/ModalAddProject";
import ListProjects from "../../component/ListProjects";
import MenuAndHeader from "../../component/MenuAndHeader";

let mapStateToProps = state => {
  return {
    state: state.main,
    users: state.users.users,
    user: state.users.profile.id
  };
};

function ProjectPage(props) {
  const [visibleAddProject, setVisibleAddProject] = useState(false);

  if (!props.user) return <Redirect to={"/login"} />;
  return (
    <div className="main-page">
      <MenuAndHeader />

      <div>
        <div className="main-page__content">
          <div className="main-page__content-title project__title">
            <div>Мои проекты</div>
            <div onClick={() => setVisibleAddProject(true)}>
              <Button text="Добавить проект" type="add-task" color="blue" />
            </div>
          </div>
          <ListProjects projects={props.state.projects} users={props.users} />
        </div>
      </div>
      {visibleAddProject && (
        <ModalAddProject
          active={visibleAddProject}
          setActive={setVisibleAddProject}
          project
        />
      )}
    </div>
  );
}

export default connect(mapStateToProps)(ProjectPage);
