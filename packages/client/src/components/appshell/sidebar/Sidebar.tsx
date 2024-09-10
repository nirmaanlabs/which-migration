import { Allotment } from "allotment";
import { Pane } from "../pane/Pane";
import { Document } from "../types";
import styles from "./sidebar.module.css";

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
      <div className={styles.content}>
        <Allotment vertical>
          <Allotment.Pane
            key="openEditors"
            maxSize={22 + 22 * 22}
            minSize={22 + 22 * 22}
          >
            <Pane title="Open Editors">
              {/* <div className={styles.list}>
                {openEditors.map((document, index) => (
                  <div key={index} className={styles.listRow}>
                    <a
                      className={classNames(
                        "codicon codicon-close",
                        styles.actionLabel
                      )}
                      role="button"
                      title="Close Editor (⌘W)"
                      onClick={() => {
                        const newDocuments = [...openEditors];
                        newDocuments.splice(index, 1);

                        onOpenEditorsChange(newDocuments);
                      }}
                    ></a>
                    <div className={styles.iconLabel}>
                      <div className={styles.iconLabelContainer}>
                        <span className={styles.iconNameContainer}>
                          <a className={styles.labeName}>{document.title}</a>
                        </span>
                        <span className={styles.iconDescriptionContainer}>
                          <span className={styles.labelDescription}>
                            stories/components
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
              <div>Champu dev</div>
            </Pane>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
};
