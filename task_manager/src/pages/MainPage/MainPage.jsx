import React, { useState } from "react";
import "./MainPage.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../component/Button";
import ModalAddProject from "../../component/ModalAddProject";
import ListProjects from "../../component/ListProjects";
import MenuAndHeader from "../../component/MenuAndHeader";

let mapStateToProps = state => {
  return {
    state: state.main,
    user: state.users.profile.id
  };
};

function MainPage(props) {
  const [visibleAddProject, setVisibleAddProject] = useState(false);
  if (!props.user) return <Redirect to={"/login"} />;

  return (
    <div className="main-page">
      <MenuAndHeader />

      <div>
        <div className="main-page__content">
          <div className="main-page__content-title project__title">
            <div>Последние проекты</div>
            <div onClick={() => setVisibleAddProject(true)}>
              <Button text="Добавить проект" type="add-task" color="blue" />
            </div>
          </div>
          <ListProjects
            projects={props.state.projects}
            slice={9}
            users={props.users}
          />
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

export default connect(mapStateToProps)(MainPage);
