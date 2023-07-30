import React from "react";
import "./Note.scss";
import NoteForms from "../../Forms/NoteForms";
import { nanoid } from "nanoid";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";



export default function NoteComponent() {
    const [newNoteToggle, setNewNoteToggle] = React.useState(false);

    const [toggleSearch, setToggleSearch] = React.useState(false);

    const toggleSearchBar = () => {
        setToggleSearch(!toggleSearch);
    };

    const saveNoteSearch = () => {
        const searchInput = document.querySelector(".search-input").value;
        setNotes([...notes, searchInput]);
        console.log(searchInput);
    };

    const [notes, setNotes] = React.useState([]);

    const [noteData, setNoteData] = React.useState(
        JSON.parse(localStorage.getItem("notes")) || []
    );

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (noteData[0] && noteData[0].id) || ""
    );

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(noteData));
    }, [noteData]);

    const dateTime = new Date().toLocaleString();

    const toggleCloseNewNote = () => {
        setNotes((current) =>
            current.filter(
                (currentId) =>
                    !(currentId.id === currentNoteId && currentId.title === "")
            )
        );
        setNewNoteToggle(!newNoteToggle);
    };

    function updateNoteHeader(text) {
        setNotes((oldNotes) =>
            oldNotes.map((oldNote) => {
                return oldNote.id === currentNoteId
                    ? {
                          ...oldNote,
                          title: text.target.value,
                          timestamp: dateTime,
                      }
                    : oldNote;
            })
        );
    }

    function updateNoteTags(tags) {
        
        const tag = tags.target.value.split(",");

        setNotes((oldNotes) =>
            oldNotes.map((oldNote) => {
                return oldNote.id === currentNoteId
                    ? {
                          ...oldNote,
                          tags: tag,
                          timestamp: dateTime,
                      }
                    : oldNote;
            })
        );
        console.log(notes[0].tags);
    }


    function updateNoteContent(text) {
        console.log(text);

        setNotes((oldNotes) =>
            oldNotes.map((oldNote) => {
                return oldNote.id === currentNoteId
                    ? {
                          ...oldNote,
                          body: text,
                          timestamp: dateTime,
                      }
                    : oldNote;
            })
        );
    }

    function findCurrentNote() {
        return notes.find((note) => note.id === currentNoteId);
    }

    const handleAddNewNotes = () => {
        setNewNoteToggle(!newNoteToggle);

        const newNote = {
            id: nanoid(),
            title: "",
            tags: [],
            body: "# Type your markdown note's title here",
            timestamp: dateTime,
        };
        setNotes((prev) => [newNote, ...prev]);
        setCurrentNoteId(newNote.id);
    };

    const submitNotes = (props) => {
        const check = noteData.find((note) => note.id === props.id);
        if (check) {
            setNoteData((prev) =>
                prev.map((note) => {
                    return note.id === props.id
                        ? {
                              ...note,
                              title: props.title,
                              tags: props.tags,
                              body: props.body,
                              timestamp: props.timestamp,
                          }
                        : note;
                })
            );
        }
        else {
            setNoteData((prev) => [notes[0], ...prev]);
        }
        setNewNoteToggle(!newNoteToggle);
    };

    const deleteNote = (event) => {
        setNoteData((prev) => prev.filter((note) => note.id !== event.target.value));
    };

    const updateNote = (event) => {
        setCurrentNoteId(event.target.value);
        setNotes(
            noteData.map((note) => {
                return note.id === event.target.value
                    ? {
                            ...note,
                            title: note.title,
                            tags: note.tags,
                            body: note.body,
                            timestamp: note.timestamp,
                        }
                    : note;
            })
        );
        setNewNoteToggle(!newNoteToggle);

    };
    
    const allNotes = noteData.map((note) => {

        const taglength = note.tags.length;
        var showTag = null;
        if (taglength > 0) {
             showTag = note.tags.map((tag) => {
                return ( 
                    <p className="note-tag">{tag}</p>
                );
            });
        }
        
        return (
            <div className="col-3 note-card" key={note.id}>
                <div className="row">
                    <div className="col-12">
                        <h3 className="note-title">{note.title}</h3>
                    </div>
                </div>
                <hr className="note-hr" />
                <div className="row">
                    <div className="col-12">
                        <p className="note-content-body">
                            <ReactMarkdown children={note.body} />
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {taglength > 0 ? showTag : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="note-timestamp">Last Edit: {note.timestamp}</p>
                    </div>
                </div>
                <div className="row row-button">
                    <div className="col-6">
                        <button className="edit-button" value={note.id} onClick={updateNote}>Edit</button>
                    </div>
                    <div className="col-6">
                        <button className="remove-button" value={note.id} onClick={deleteNote}>Delete</button>
                    </div>
                </div>
            </div>
        );
    });

    const getCurrentTag = () => {
        const currentTag = [];
        for (let i = 0; i < findCurrentNote().tags.length; i++) {
            currentTag.push(findCurrentNote().tags[i]);
        }
        return currentTag;
    };

    return (
        <div className="container-fluid note">
            <div className="row top-bar">
                <div className="col top-bar-left">
                    <span className="title">
                        <h1>Notes</h1>
                    </span>
                    {newNoteToggle ? (
                        <span
                            className="close-icon span-icon new-note-toggle-icon"
                            onClick={toggleCloseNewNote}
                        >
                            <i className="fas fa-close"></i>
                        </span>
                    ) : (
                        <span
                            className="add-icon span-icon new-note-toggle-icon"
                            onClick={handleAddNewNotes}
                        >
                            <i className="fas fa-plus"></i>
                        </span>
                    )}
                </div>
                <div className="col top-bar-right">
                    {toggleSearch ? (
                        <div className="col-4 right-left">
                            <input
                                type="text"
                                placeholder="Search"
                                className="search-input"
                            />
                            <button
                                className="search-button"
                                onClick={saveNoteSearch}
                            >
                                Search
                            </button>
                        </div>
                    ) : null}
                    <div className="col-3 right-right">
                        {toggleSearch ? (
                            <span
                                className="span-icon close-icon"
                                onClick={toggleSearchBar}
                            >
                                <i className="fas fa-close"></i>
                            </span>
                        ) : (
                            <span
                                className="search span-icon"
                                onClick={toggleSearchBar}
                            >
                                <i className="fas fa-search"></i>
                            </span>
                        )}
                        <span className="grid span-icon">
                            <i className="fas fa-th-large"></i>
                        </span>
                        <span className="list span-icon">
                            <i className="fas fa-list"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div className="row new-note-content">
                {newNoteToggle ? (
                    <NoteForms
                        title={findCurrentNote().title}
                        updateNoteHeader={updateNoteHeader}
                        updateNoteTags={updateNoteTags}
                        currentNote={findCurrentNote().body}
                        updateNoteContent={updateNoteContent}
                        timestamp={findCurrentNote().timestamp}
                        showTags={getCurrentTag()}
                        submitNotes={submitNotes}
                        currentN = {findCurrentNote()}
                    />
                ) : null}
            </div>

            <div className="row note-content">{allNotes}</div>
        </div>
    );
}
