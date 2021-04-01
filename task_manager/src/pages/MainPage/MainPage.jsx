import React, { useState, useCallback } from "react";
import "./MainPage.scss";
import { ReactComponent as File } from "../../svg/file.svg";
const list = {
  id: 1,
  name: "shops",
  tasks: [
    { id: 1, name: "shops", status: 1 , metka:[1],file:[],author:[123]},
    { id: 2, name: "123", status: 2 },
    { id: 3, name: "1234", status: 2 },

    { id: 4, name: "1234", status: 2 },
    { id: 5, name: "1234", status: 2 },
    { id: 6, name: "1234", status: 2 },
    { id: 7, name: "1234", status: 2 },
    { id: 8, name: "1234", status: 2 },
    { id: 9, name: "1234", status: 2 },
    { id: 10, name: "1234", status: 2 },
    { id: 11, name: "1234", status: 2 },
    { id: 12, name: "1234", status: 2 },
    { id: 13, name: "1234", status: 2 }
  ],
  status: [
    { id: 1, name: "status1" },
    { id: 2, name: "status2" },
    { id: 3, name: "status5" },
    { id: 4, name: "status6" }
  ]
};

function MainPage() {
  return (
    <div className="lists">
      {console.log(list.tasks)}
      {list.status.map(elem => (
        <div className="lists__list" key={elem.id}>
          <div className="lists__list-title">{elem.name}</div>

          <div className="lists__list-tasks">
            {list.tasks
              .filter(item => item.status === elem.id)
              .map(e => (
                <div className="lists__list-tasks__task" key={e.id}>
                  <div className="lists__list-tasks__task__title">{e.name}</div>
                  {e.metka && (
                    <div className="lists__list-tasks__task__metka">
                      {e.metka}
                    </div>
                  )}
                  {e.fail && (
                    <div className="lists__list-tasks__task__fail">
                      {e.fail}
                    </div>
                  )}

                  {(e.author || e.file) && (
                    <div className="lists__list-tasks__task__bottom">
                      {e.author && (
                        <div className="lists__list-tasks__task__author">
                          {e.author}
                        </div>
                      )}
                      {e.file && <div className="lists__list-tasks__task__file">
                        {e.file.length}
                        <File />
                      </div>}

                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainPage;
