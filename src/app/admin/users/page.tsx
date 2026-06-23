"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/src/context/i18nContext";

const AdminUsers = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div id="root" className="todo-app">
      <header className="todo-header">
        <h1>{t.admin.title}</h1>
      </header>

      <div className="todo-panel todo-content-block">
        <p>{t.admin.table}</p>

        <div className="todo-page-actions todo-actions">
          <button type="button" className="btn-add" onClick={() => router.back()}>
            {t.admin.back}
          </button>
          <button type="button" className="btn-add btn-add--ghost" onClick={() => router.push("/")}>
            {t.admin.home}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
