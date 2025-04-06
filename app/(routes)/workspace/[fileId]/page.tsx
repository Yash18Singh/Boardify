"use client";
import React, { useState, useEffect, useRef } from "react";
import WorkspaceHeader from "../_workspaceComp/WorkspaceHeader";
import WorkspaceEditor from "../_workspaceComp/WorkspaceEditor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import WorkspaceCanvas from "../_workspaceComp/WorkspaceCanvas";

const Workspace = ({ params }: { params: Promise<{ fileId: Id<"files"> }> }) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<any>();
  const [fileId, setFileId] = useState<Id<"files"> | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  document.title = fileData ? `Boardify | ${fileData?.fileName}` : "Boardify";

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    params.then((resolvedParams) => {
      setFileId(resolvedParams.fileId);
    });
  }, [params]);

  useEffect(() => {
    if (!fileId) return;

    const getFileData = async () => {
      try {
        const result = await convex.query(api.files.getFileById, { _id: fileId });
        setFileData(result);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };

    getFileData();
  }, [fileId]);

  // Handle resizable layout - only for desktop
  const [editorWidth, setEditorWidth] = useState(50);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setEditorWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    console.log("FILE DATA FROM DB: ", fileData);
  }, [fileData]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <WorkspaceHeader fileName={fileData && fileData.fileName} saveDocument={() => setTriggerSave(!triggerSave)} />

      {/* Main scrollable container */}
      <div 
        ref={mainContainerRef}
        className="flex-1 overflow-y-auto" 
        style={{ WebkitOverflowScrolling: 'touch' }} // For smooth scrolling on iOS
      >
        {/* WORKSPACE LAYOUT */}
        <div className={`flex ${isMobile ? 'flex-col h-auto' : 'flex-row h-screen'}`}>
          {/* DOCUMENT EDITOR */}
          <div 
            style={!isMobile ? { width: `${editorWidth}%` } : { width: '100%' }} 
            className={isMobile ? "min-h-[50vh]" : "h-full"}
          >
            {fileId && <WorkspaceEditor onSaveTrigger={triggerSave} fileId={fileId} fileData={fileData} />}
          </div>

          {/* RESIZER (Only on larger screens) */}
          {!isMobile && (
            <div className="w-1 bg-gray-300 cursor-ew-resize" onMouseDown={handleMouseDown}></div>
          )}

          {/* WHITEBOARD CANVAS */}
          <div 
            style={!isMobile ? { width: `${100 - editorWidth}%` } : { width: '100%' }} 
            className={isMobile ? "min-h-[50vh]" : "h-full"}
          >
            <WorkspaceCanvas onSaveTrigger={triggerSave} fileId={fileId} fileData={fileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;