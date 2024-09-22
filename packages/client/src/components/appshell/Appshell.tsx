import "@vscode/codicons/dist/codicon.css";
import "allotment/dist/style.css";

import { Allotment, LayoutPriority } from "allotment";
import { useState } from "react";
import { Activitybar } from "./activitybar/Activitybar";
import { Editor } from "./editor/Editor";
import { Panel } from "./panel/Panel";
import { Sidebar } from "./sidebar/Sidebar";
import { Statusbar } from "./statusbar/Statusbar";
import { TopMenubar } from "./topmenubar/TopMenubar";

export const DOCUMENTS = [
  { title: "allotment.tsx", icon: "ts" },
  { title: "allotment.module.css", icon: "css" },
];

export const ACTIVITIES = [
  "Explorer",
  "Search",
  "Source Control",
  "Run and Debug",
  "Extensions",
];

const TopMenubarPane = Allotment.Pane;
const ActivitybarPane = Allotment.Pane;
const MainContentPane = Allotment.Pane;
const EditorPane = Allotment.Pane;
const QueryPane = Allotment.Pane;

export const Appshell = () => {
  // const [openEditors, setOpenEditors] = useState(DOCUMENTS);
  const [editorVisible, setEditorVisible] = useState(true);
  const [panelVisible, setPanelVisible] = useState(true);
  const [primarySideBar, setPrimarySideBar] = useState(true);

  const sidebar = (
    <Allotment.Pane
      key="sidebar"
      minSize={170}
      priority={LayoutPriority.Low}
      preferredSize={300}
      visible={primarySideBar}
      snap
    >
      <Sidebar />
    </Allotment.Pane>
  );

  return (
    <>
      <Allotment vertical>
        <TopMenubarPane minSize={40} maxSize={40}>
          <TopMenubar />
        </TopMenubarPane>
        <Allotment.Pane>
          <Allotment proportionalLayout={false}>
            <ActivitybarPane key="activitybar" minSize={48} maxSize={48}>
              <Activitybar
                setPrimarySideBar={() => setPrimarySideBar(!primarySideBar)}
              />
            </ActivitybarPane>
            {sidebar}
            <MainContentPane
              key="maincontent"
              minSize={300}
              priority={LayoutPriority.High}
            >
              <Allotment vertical snap>
                <EditorPane key="editor" minSize={70}>
                  <Editor />
                </EditorPane>
                <QueryPane
                  key="query"
                  minSize={78}
                  preferredSize={"40%"}
                  visible={panelVisible}
                >
                  <Panel
                    maximized={!editorVisible}
                    onClose={() => {
                      setEditorVisible(true);
                      setPanelVisible(false);
                    }}
                    onMaximize={() => {
                      setEditorVisible(false);
                      setPanelVisible(true);
                    }}
                    onMinimize={() => {
                      setEditorVisible(true);
                      setPanelVisible(true);
                    }}
                  />
                </QueryPane>
              </Allotment>
            </MainContentPane>
          </Allotment>
        </Allotment.Pane>
        <Allotment.Pane minSize={40} maxSize={40}>
          <Statusbar />
        </Allotment.Pane>
      </Allotment>
    </>
  );
};
