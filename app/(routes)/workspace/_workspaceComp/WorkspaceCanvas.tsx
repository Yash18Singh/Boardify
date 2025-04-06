"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function WorkspaceCanvas({ onSaveTrigger, fileId, fileData } : { onSaveTrigger: boolean, fileId: any, fileData: any }) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>([]); // Ensure it starts as an empty array
  const updateWhiteBoard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    if (fileData?.whiteboard) {
      try {
        const parsedData = fileData.whiteboard.trim() ? JSON.parse(fileData.whiteboard) : [];
        setWhiteBoardData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setWhiteBoardData([]); // Fallback to empty array if JSON is invalid
      }
    } else {
      setWhiteBoardData([]); // Default to empty if no data
    }
  }, [fileData]);

  useEffect(() => {
    if (onSaveTrigger) saveWhiteBoard();
  }, [onSaveTrigger]);

  const saveWhiteBoard = () => {
    updateWhiteBoard({ _id: fileId, whiteboard: JSON.stringify(whiteBoardData) })
      .then((res) => console.log("Whiteboard updated successfully", res))
      .catch((err) => console.error("Error updating whiteboard", err));
  };

  return (
    <div style={{ height: "100vh" }}>
      {fileData && (
        <Excalidraw
          onChange={(excalidrawElements) => setWhiteBoardData(excalidrawElements)}
          initialData={{
            appState: { viewBackgroundColor: "#fff" },
            elements: whiteBoardData, // ✅ Ensure it's always an array
            files: {},
          }}
          theme="light"
          UIOptions={{
            canvasActions: {
              saveAsImage: true,
              exportToCanvas: true,
              exportToExcalidraw: true,
              export: false,
            },
          }}
        >
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}
