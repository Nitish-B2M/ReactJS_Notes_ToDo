import React from "react";
import "./NoteForms.scss";
import Split from "react-split";
import ReactMde from "react-mde";
import Showdown from "showdown";

function NoteForms({ updateNoteHeader, updateNoteTags, currentNote, updateNoteContent, timestamp, showTags, submitNotes, title, currentN}) {

    const [selectedTab, setSelectedTab] = React.useState("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    });

    const [newTimestamp, setNewTimestamp] = React.useState(timestamp);

    React.useEffect(() => {
        setNewTimestamp(timestamp);
    }, [timestamp]);

    const taglength = showTags.length;

    
    const showTag = showTags.map((tag) => { 
        return (
            <div className="tag">
                <p className="tag-text">{tag}</p>
            </div>
        );
    });
    

    return (
        <>
            <div className="new-note-form">
                <Split 
                    sizes={[35, 65]} 
                    direction="horizontal" 
                    className="split"
                >
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                placeholder="Note Title"
                                className="title-input new-note-input"
                                onChange={updateNoteHeader}
                                value={title}
                                />
                            <input
                                type="text"
                                placeholder="Add Tag"
                                className="tag-input new-note-input"
                                onChange={updateNoteTags}
                                value={showTags}
                                // value={currentTag}
                                />
                        </div>
                        <div className="col">
                            {taglength > 0 ? showTag : null}
                        </div>

                        <div className="col">
                            <button 
                                className="save-button" 
                                onClick={() => submitNotes(currentN)}
                            >
                                Save
                            </button>
                        </div>
                        <div className="col">
                            <p className="timestamp">Last edited: {newTimestamp}</p>
                        </div>
                    </div>
                    <div className="row">
                        <ReactMde 
                            value={currentNote}
                            onChange={updateNoteContent}
                            selectedTab={selectedTab}
                            onTabChange={setSelectedTab}

                            generateMarkdownPreview={(markdown) =>
                                Promise.resolve(converter.makeHtml(markdown))
                            }
                        />
                    </div>
                </Split>
            </div>
        </>
    );
}

export default NoteForms;
