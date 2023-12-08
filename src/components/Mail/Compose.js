import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import styles from "./Compose.module.css";

function Compose() {
  console.log(EditorState.createEmpty);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <div className={styles.compose_container}>
      <div className={styles.input}>
        <input type="text" placeholder="Enter Reciepent Email" />
        <input type="text" placeholder="Enter Subject" />
      </div>
      <Editor
        defaultEditorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={styles["wrapper-class"]}
        editorClassName={styles["editor-class"]}
        toolbarClassName={styles["toolbar-class"]}
        placeholder="Enter Your Message ...."
      />
    </div>
  );
}

export default Compose;
