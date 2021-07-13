import React from "react";
import "./FormAddProject.scss";
import { Field, reduxForm } from "redux-form";
import { ReactComponent as Closed } from "../../svg/closed.svg";
import Users from "../Users/Users";
import Button from "../Button";

const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue13 = minValue(13);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const tooYoung = value =>
  value && value < 13
    ? "You do not meet the minimum age requirement!"
    : undefined;
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

const renderField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <input className={className} {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const data = {
  username: "Jane",
  email: "liz@mail.ru",
  age: "42"
};
function FormAddProject(props) {
  const { handleSubmit, pristine, load, reset, submitting } = props;
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => load(data)}>
          Load Account
        </button>
        <Field
          name="username"
          type="text"
          component={renderField}
          label="Username"
          validate={[required, maxLength15, minLength2]}
          warn={alphaNumeric}
        />
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
          validate={email}
          warn={aol}
        />
        <Field
          name="age"
          type="number"
          component={renderField}
          label="Age"
          validate={[required, number, minValue13]}
          warn={tooYoung}
        />
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
      <form>
        <Field
          className="modal-project__input input__name"
          name="nameProject"
          type="text"
          component={renderField}
          label="Название проекта"
          validate={[required, maxLength15, minLength2]}
          warn={alphaNumeric}
          meta={{ initial: 123 }}
        />
        <div className="project__select__status">
          <div className="add-item-status">Статус</div>
          <div
            onClick={() => props.setActiveStatus(1)}
            className={
              props.activeStatus === 1
                ? "active-status-project project-add__status-active"
                : "project-add__status-active"
            }
          >
            Активный
          </div>
          <div
            onClick={() => props.setActiveStatus(2)}
            className={
              props.activeStatus === 2
                ? "active-status-project project-add__status-stop"
                : "project-add__status-stop"
            }
          >
            Приостановлен
          </div>
          <div
            onClick={() => props.setActiveStatus(3)}
            className={
              props.activeStatus === 3
                ? "active-status-project project-add__status-complete"
                : "project-add__status-complete"
            }
          >
            Завершен
          </div>
        </div>
        <div>
          <div className="add-item">Создатель</div>
          {props.usersProps.map(
            user => user.id === props.author && <div>{user.name}</div>
          )}
        </div>
        <div className={"add-item"}>Дополнительные поля (необязательные)</div>
        <Field
          className="modal-project__input"
          name="descriptionProject"
          type="text"
          component={renderField}
          label="Введите описание проекта"
          validate={[required, maxLength15, minLength2]}
          warn={alphaNumeric}
        />
        <div className="command-project">
          <div className="add-item">Команда</div>
          <div className="add-users" onClick={() => props.setAddUsers(true)}>
            Добавить пользователей
          </div>
          {props.addUsers && (
            <div>
              <div
                className="bg-close modal-project-bg"
                onClick={() => props.setAddUsers(false)}
              >
                <div
                  className="add__user__modal"
                  onClick={e => e.stopPropagation()}
                >
                  <div
                    className="add__user__modal-closed"
                    onClick={() => props.setAddUsers(false)}
                  >
                    <Closed />
                  </div>
                  {props.usersProps.map(user => (
                    <div
                      className={
                        props.users.filter(userId => userId === user.id)[0] ===
                        user.id
                          ? "add__user__modal__item-active add__user__modal__item"
                          : "add__user__modal__item"
                      }
                      key={user.id}
                      onClick={() =>
                        props.indx(props.users, user.id) === -1
                          ? props.setUsers([...props.users, user.id])
                          : props.setUsers([
                              ...props.users.slice(
                                0,
                                props.indx(props.users, user.id)
                              ),
                              ...props.users.slice(
                                props.indx(props.users, user.id) + 1
                              )
                            ])
                      }
                    >
                      <div className="add__user__modal__item-txt">
                        <Users userIdArray={user.name.substring(0, 1)} />
                        &nbsp;{user.name}
                        {user.id === props.user.id && <>(Я)</>}
                      </div>
                      {props.users.filter(userId => userId === user.id)[0] ===
                      user.id ? (
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
          )}
          <div className="project__users">
            {props.users &&
              props.users.map(userId =>
                props.usersProps.map(
                  user =>
                    user.id === userId && (
                      <div key={user.id} className="project__users-user ">
                        <Users userIdArray={user.name.substring(0, 1)} />
                        <div
                          className="project__users-user__delete"
                          onClick={() =>
                            props.setUsers([
                              ...props.users.slice(
                                0,
                                props.indx(props.users, user.id)
                              ),
                              ...props.users.slice(
                                props.indx(props.users, user.id) + 1
                              )
                            ])
                          }
                        >
                          <Closed />
                        </div>
                      </div>
                    )
                )
              )}
          </div>
        </div>
        ////
        <div className="modal-task__button">
          {!props.project.name ? (
            <div onClick={() => props.setActive(false)}>
              <Button text="Удалить" type="add-task" color="rad" />
            </div>
          ) : (
            <div onClick={() => props.deleteProjectF()}>
              <Button text="Удалить" type="add-task" color="rad" />
            </div>
          )}
          {props.nameProject ? (
            <div onClick={props.saveNewProjectClick}>
              <Button text="Сохранить" type="add-task" color="blue" />
            </div>
          ) : (
            <Button
              text="Сохранить"
              type="add-task"
              color="blue"
              noActive={true}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default reduxForm({
  form: "addProject" // a unique identifier for this form
})(FormAddProject);
