import React from "react";
import "./Todo.scss";

export default function TodoComponent() {
    return (
        <div className="container-fluid todo">
            <h1>Todo</h1>
            <div className="todo__list">
                <div className="todo__list__item">
                    <div className="todo__list__item__checkbox">
                        <input type="checkbox" />
                    </div>
                    <div className="todo__list__item__text">
                        <p>Todo 1</p>
                    </div>
                    <div className="todo__list__item__delete">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
