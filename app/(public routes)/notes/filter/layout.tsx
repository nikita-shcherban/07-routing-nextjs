import React from "react";
import css from "./LayoutNotes.module.css";

interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLayout = ({ sidebar, children }: SidebarLayoutProps) => {
  return (
    <div>
      <section className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <div className={css.notesWrapper}>{children}</div>
      </section>
    </div>
  );
};

export default SidebarLayout;
