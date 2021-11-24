import React from "react";
import "./Validation.scss";

function Validation({ value, maxLength, minLength, empty }) {
  return (
    <>
      {(!value.isDirty ||
        (!value.isEmpty &&
          !value.maxLengthError &&
          !value.minLengthError &&
          !value.emailError) ||
        (!value.isDirty && value.isEmpty)) && (
        <span className={"error-input"} />
      )}

      {value.isDirty && value.isEmpty && !empty && !value.maxLengthError && (
        <div>
          <div className={"error-input"}>Поле не может быть пустым</div>
        </div>
      )}
      {empty && !value.maxLengthError && (
        <div>
          <div className={"error-input"} />
        </div>
      )}
      {empty && value.isDirty && !value.maxLengthError && (
        <div>
          <div className={"error-input"} />
        </div>
      )}
      {value.isDirty && value.maxLengthError && (
        <div>
          <div className={"error-input"}>
            Поле не может быть больше {maxLength} символов
          </div>
        </div>
      )}
      {value.isDirty && !value.isEmpty && value.minLengthError && (
        <div>
          <div className={"error-input"}>
            Поле не может быть меньше {minLength} символов
          </div>
        </div>
      )}
      {value.isDirty &&
        !value.isEmpty &&
        !value.maxLengthError &&
        value.emailError && (
          <div>
            <div className={"error-input"}>Неправильный формат email</div>
          </div>
        )}
    </>
  );
}

export default Validation;
