import styles from "./sidebar.module.css";
import { Document } from "../types";

export type SidebarProps = {
  title: string;
  documents: Document[];
  openEditors: Document[];
  onOpenEditorsChange: (documents: Document[]) => void;
};

export const Sidebar = () => {
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
      <div className={styles.content}></div>
    </div>
  );
};
