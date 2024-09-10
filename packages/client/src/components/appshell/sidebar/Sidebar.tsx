import { Allotment } from "allotment";
import { Pane } from "../pane/Pane";
import { Document } from "../types";
import styles from "./sidebar.module.css";
import { useAuth } from "@/context/auth";

export type SidebarProps = {
  title: string;
  documents: Document[];
  openEditors: Document[];
  onOpenEditorsChange: (documents: Document[]) => void;
};

export const Sidebar = () => {
  const { isConnected } = useAuth();
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <div className={styles.titleLabel}>
          <h2>OBJECT EXPLORER</h2>
        </div>
        <div className={styles.titleActions}>
          <div className={styles.actionsContainer}>
            <a className="codicon codicon-ellipsis"></a>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <Allotment vertical>
          <Allotment.Pane
            key="openEditors"
            maxSize={22 + 22 * 22}
            minSize={22 + 22 * 22}
          >
            <Pane title="Open Editors">
              <div>{isConnected ? "Connected" : "Not Connected"}</div>
            </Pane>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
};
