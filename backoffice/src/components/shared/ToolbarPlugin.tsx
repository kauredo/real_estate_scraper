/* eslint-disable no-restricted-syntax */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
    );
  }, [editor, updateToolbar]);

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const formatUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const formatRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatAlignLeft = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
  };

  const formatAlignCenter = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
  };

  const formatAlignRight = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
  };

  const formatAlignJustify = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
  };

  return (
    <div className="toolbar">
      <button
        onClick={formatUndo}
        className="toolbar-item"
        aria-label="Undo"
        type="button"
      >
        <i className="format undo" />
      </button>
      <button
        onClick={formatRedo}
        className="toolbar-item"
        aria-label="Redo"
        type="button"
      >
        <i className="format redo" />
      </button>
      <span className="toolbar-divider" />
      <button
        onClick={formatBold}
        className={`toolbar-item ${isBold ? "active" : ""}`}
        aria-label="Format Bold"
        type="button"
      >
        <i className="format bold" />
      </button>
      <button
        onClick={formatItalic}
        className={`toolbar-item ${isItalic ? "active" : ""}`}
        aria-label="Format Italic"
        type="button"
      >
        <i className="format italic" />
      </button>
      <span className="toolbar-divider" />
      <button
        onClick={formatAlignLeft}
        className="toolbar-item"
        aria-label="Left Align"
        type="button"
      >
        <i className="format left-align" />
      </button>
      <button
        onClick={formatAlignCenter}
        className="toolbar-item"
        aria-label="Center Align"
        type="button"
      >
        <i className="format center-align" />
      </button>
      <button
        onClick={formatAlignRight}
        className="toolbar-item"
        aria-label="Right Align"
        type="button"
      >
        <i className="format right-align" />
      </button>
      <button
        onClick={formatAlignJustify}
        className="toolbar-item"
        aria-label="Justify Align"
        type="button"
      >
        <i className="format justify-align" />
      </button>
      <span className="toolbar-divider" />
      <button
        onClick={formatBulletList}
        className={`toolbar-item ${blockType === "ul" ? "active" : ""}`}
        aria-label="Bullet List"
        type="button"
      >
        <i className="format bullet-list" />
      </button>
      <button
        onClick={formatNumberedList}
        className={`toolbar-item ${blockType === "ol" ? "active" : ""}`}
        aria-label="Numbered List"
        type="button"
      >
        <i className="format numbered-list" />
      </button>
    </div>
  );
}
