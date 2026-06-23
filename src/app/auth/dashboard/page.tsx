"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/src/context/i18nContext";

export default function DashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div id="root" className="todo-app">
      <header className="todo-header">
        <h1>{t.dashboard.title}</h1>
        <p className="todo-subtitle">{t.dashboard.subtitle}</p>
      </header>

      <div className="todo-panel">
        <div className="todo-page-actions todo-actions">
          <button type="button" className="btn-add" onClick={() => router.push("/")}>
            {t.common.home}
          </button>
        </div>
      </div>
    </div>
  );
}
