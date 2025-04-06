"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'

// Import Tools
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import Underline from '@editorjs/underline'
import Marker from '@editorjs/marker'
import Checklist from '@editorjs/checklist'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import SimpleImage from "@editorjs/simple-image"
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code'
import InlineCode from '@editorjs/inline-code'
import Warning from '@editorjs/warning'
import Delimiter from '@editorjs/delimiter'
import LinkTool from '@editorjs/link'
import RawTool from '@editorjs/raw'
import AttachesTool from '@editorjs/attaches'
import Personality from '@editorjs/personality'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

// ✅ Default template data
const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: 'Document Name Here...',
        level: 1
      },
      id: '123',
      type: 'header'
    },
    {
      data: {
        text: 'Enter a Heading...',
        level: 3
      },
      id: '456',
      type: 'header'
    },
  ],
  version: "2.8.1"
}

const WorkspaceEditor = ({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: boolean, fileId: any, fileData: any }) => {
  const ref = useRef<EditorJS | null>(null);
  const [document, setDocument] = useState(rawDocument);
  const updateDocument = useMutation(api.files.updateDocument);

  // ✅ Update document when fileData arrives
  useEffect(() => {
    if (fileData?.document) {
      try {
        const parsedData = JSON.parse(fileData.document);
        setDocument(parsedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setDocument(rawDocument); // Fallback to template
      }
    }
  }, [fileData]);
  

  // ✅ Destroy and reinitialize EditorJS when document updates
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (ref.current) {
        ref.current.destroy(); // Destroy existing instance
      }

      const editor = new EditorJS({
        holder: 'editorjs',
        data: document, // ✅ Updated document
        autofocus: true,
        placeholder: "Start typing here...",
        tools: {
          paragraph: { class: Paragraph, inlineToolbar: true },
          header: { class: Header, config: { levels: [1, 2, 3, 4, 5, 6], defaultLevel: 2 } },
          quote: { class: Quote, inlineToolbar: true },
          underline: Underline,
          marker: Marker,
          checklist: { class: Checklist, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          embed: { class: Embed, config: { services: { youtube: true, twitter: true } } },
          image: { class: ImageTool, config: { endpoints: { byFile: '/upload', byUrl: '/fetch' } } },
          simpleImage: { class: SimpleImage },
          table: { class: Table, inlineToolbar: true },
          code: { class: CodeTool },
          inlineCode: InlineCode,
          warning: { class: Warning },
          delimiter: Delimiter,
          linkTool: { class: LinkTool, config: { endpoint: '/fetchUrl' } },
          raw: { class: RawTool },
          attaches: { class: AttachesTool, config: { endpoint: '/upload' } },
          personality: { class: Personality, config: { endpoint: '/fetchPersonality' } },
        }
      });

      ref.current = editor;

      return () => {
        ref.current?.destroy?.();
        ref.current = null;
     };
    }
  }, [document]); // ✅ Rerun when document updates

  // ✅ Save document
  const onSaveDocument = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        updateDocument({
          _id: fileId,
          document: JSON.stringify(outputData)
        }).then(() => {
          toast("DOCUMENT UPDATED!");
        }).catch(() => {
          toast("SERVER ERROR");
        });
      }).catch((error) => {
        console.log("SAVING FAILED:", error);
      });
    }
  };

  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
    }
  }, [onSaveTrigger]);

  return <div id="editorjs"></div>;
};

export default WorkspaceEditor;
