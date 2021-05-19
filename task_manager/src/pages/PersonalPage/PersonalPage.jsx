import React, { useCallback, useState } from "react";

import "./PersonalPage.scss";
import Menu from "../../component/Menu";
import Header from "../../component/Header";
import { connect } from "react-redux";

import { ReactComponent as Edit } from "../../svg/edit.svg";
import Button from "../../component/Button";
import { sendChangeUser } from "../../redux/profile-reducer";

let mapStateToProps = state => {
  return {
    state: state.users.profile
  };
};

function PersonalPage(props) {
  const getUserData = type => {
    switch (type) {
      case "name":
        return props.state.name ? props.state.name : "";
      case "email":
        return props.state.email ? props.state.email : "";
      case "about":
        return props.state.about ? props.state.about : "";
      case "age":
        return props.state.age ? props.state.age : "";
      case "company":
        return props.state.company ? props.state.company : "";
      case "location":
        return props.state.location ? props.state.location : "";
      case "speciality":
        return props.state.speciality ? props.state.speciality : "";

      default:
        return "";
    }
  };
  const [name, setName] = useState(getUserData("name"));
  const [email, setEmail] = useState(getUserData("email"));
  const [about, setAbout] = useState(getUserData("about"));
  const [age, setAge] = useState(getUserData("age"));
  const [location, setLocation] = useState(getUserData("location"));
  const [company, setCompany] = useState(getUserData("company"));
  const [speciality, setSpeciality] = useState(getUserData("speciality"));

  const [isEdit, setIsEdit] = useState(false);
  const handleChangeAbout = useCallback(
    event => setAbout(event.target.value),
    []
  );
  const handleChangeLocation = useCallback(
    event => setLocation(event.target.value),
    []
  );
  const handleChangeAge = useCallback(event => setAge(event.target.value), []);
  const handleChangeCompany = useCallback(
    event => setCompany(event.target.value),
    []
  );
  const handleChangeSpeciality = useCallback(
    event => setSpeciality(event.target.value),
    []
  );
  const sendChange = () => {
    props.sendChangeUser(about, age, speciality, company, location);
    setIsEdit(false);
  };

  const isEditInput = (val, handle, prop) => {
    return (
      <div>
        {isEdit ? (
          <input
            className="personal__content__container-item__input"
            value={val}
            onChange={handle}
            placeholder="Добавьте информацию"
          />
        ) : prop ? (
          <div className="personal__content__container-item-txt">{prop}</div>
        ) : (
          <div className="personal__content__container-item-txt-without">
            Не указано
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="personal-page">
      <div>
        <Header />
        <Menu />
      </div>
      <div className="personal__content">
        <div className="personal__content__header">
          <div className="personal__content__header-icon">
            {props.state.name.substring(0, 1)}
          </div>

          <div className="personal__content__header-name">{name}</div>
          <div className="personal__content__header-email">{email}</div>
        </div>
        <div className="personal__content__container">
          {isEdit ? (
            <div
              className="personal__content__container__button"
              onClick={() => sendChange()}
            >
              <Button text="Сохранить" type="add-task" color="blue" />
            </div>
          ) : (
            <button
              className="personal__content__container-edit"
              onClick={() => setIsEdit(true)}
            >
              <Edit /> Редактировать
            </button>
          )}
          <div className="personal__content__container-item personal__content__container-item__about">
            <div className="personal__content__container-item-txt">О себе</div>
            {isEdit ? (
              <textarea
                className="personal__content__container-item__about-input"
                value={about}
                onChange={handleChangeAbout}
                placeholder="Добавьте информацию о себе...."
              />
            ) : (
              <textarea
                className="personal__content__container-item__about-input"
                value={about}
                onChange={handleChangeAbout}
                placeholder="Добавьте информацию о себе...."
                disabled
              />
            )}
          </div>
          <div className="personal__content__container-item">
            <div className="personal__content__container-item-txt">Возраст</div>
            {isEditInput(age, handleChangeAge, props.state.age)}
          </div>
          <div className="personal__content__container-item">
            <div className="personal__content__container-item-txt">
              Компания
            </div>
            {console.log(props.state)}
            {isEditInput(company, handleChangeCompany, props.state.company)}
          </div>
          <div className="personal__content__container-item">
            <div className="personal__content__container-item-txt">
              Специальность
            </div>

            {isEditInput(
              speciality,
              handleChangeSpeciality,
              props.state.speciality
            )}
          </div>
          <div className="personal__content__container-item">
            <div className="personal__content__container-item-txt">
              Местоположение
            </div>
            {isEditInput(location, handleChangeLocation, props.state.location)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, { sendChangeUser })(PersonalPage);
