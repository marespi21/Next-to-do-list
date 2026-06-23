"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generarBorradorBlog } from "@/src/services/ai";
import { useTranslation } from "@/src/context/i18nContext";

export default function AiWriterStreamPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [borrador, setBorrador] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const generar = async () => {
    if (!titulo.trim()) return;

    setCargando(true);
    setBorrador("");
    setError("");

    try {
      const texto = await generarBorradorBlog(titulo);
      setBorrador(texto);
    } catch {
      setError(t.ai.error);
    } finally {
      setCargando(false);
    }
  };

  const copiar = () => {
    navigator.clipboard.writeText(borrador);
  };

  return (
    <div id="root" className="todo-app">
      <header className="todo-header">
        <span className="todo-badge">{t.ai.badge}</span>
        <h1>{t.ai.title}</h1>
        <p className="todo-subtitle">{t.ai.subtitle}</p>
      </header>

      <div className="todo-panel">
        <div className="todo-form todo-form--inline">
          <input
            type="text"
            placeholder={t.ai.placeholder}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !cargando && generar()}
            disabled={cargando}
          />
          <button
            type="button"
            className="btn-add"
            onClick={generar}
            disabled={cargando || !titulo.trim()}
          >
            {cargando ? t.ai.generating : t.ai.generate}
          </button>
        </div>

        {error && <p className="todo-error">{error}</p>}

        {(borrador || cargando) && (
          <div className="todo-output">
            <div className="todo-output-header">
              <span>{t.ai.draftLabel}</span>
              {borrador && !cargando && (
                <button type="button" className="todo-link-btn" onClick={copiar}>
                  {t.ai.copy}
                </button>
              )}
            </div>
            <pre>
              {borrador}
              {cargando && <span className="todo-cursor">▌</span>}
            </pre>
          </div>
        )}

        <div className="todo-page-actions todo-actions">
          <button
            type="button"
            className="btn-add btn-add--ghost"
            onClick={() => router.push("/")}
          >
            {t.common.home}
          </button>
        </div>
      </div>
    </div>
  );
}
