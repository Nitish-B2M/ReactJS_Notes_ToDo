import React from "react";
import "./Main.scss";
import Trash from "../Contents/Trash/Trash";
import NoteComponent from "../Contents/Note/Note";
import Favorite from "../Contents/Favorite/Favorite";
import Reminder from "../Contents/Reminder/Reminder";
import TodoComponent from "../Contents/TodoList/Todo";

export default function MainComponent(props) {

    const [list, setList] = React.useState([props.mainBody]);
    
    React.useEffect(() => {
        setList(props.mainBody);
    }, [props.mainBody]);

    // for each to set the active link
    var element = "/notes";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isActive){
            element = list[i].link;
            console.log(element);
        }
    }
    
    return (
        <div className="container-fluid main">
            {element==="/notes" && <NoteComponent />}
            {element==="/todolist" && <TodoComponent />}
            {element==="/reminders" && <Reminder />}
            {element==="/favorites" && <Favorite />}
            {element==="/trash" && <Trash />}
        </div>
    );
}