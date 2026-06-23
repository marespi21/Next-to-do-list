"use client";

import { postImg } from "@/src/services/img";
import { useTranslation } from "@/src/context/i18nContext";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadImg = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !file) return;

    try {
      setLoading(true);
      const resp = await postImg(title, description, file);

      if (resp?.status == 200) {
        setFile(null);
        setPreview(null);
        setTitle("");
        setDescription("");
        toast.success(t.images.uploadSuccess);
      }
    } catch (err) {
      console.error(err);
      toast.error(t.images.uploadError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="root" className="todo-app">
      <header className="todo-header">
        <h1>{t.images.uploadTitle}</h1>
        <p className="todo-subtitle">{t.images.uploadSubtitle}</p>
      </header>

      <div className="todo-panel">
        <form onSubmit={submitForm} className="todo-form--stacked">
          <div className="todo-field">
            <label>{t.images.titleLabel}</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.images.titlePlaceholder}
            />
          </div>

          <div className="todo-field">
            <label>{t.images.descriptionLabel}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.images.descriptionPlaceholder}
              rows={3}
            />
          </div>

          <div className="todo-field">
            <label>{t.images.imageLabel}</label>
            <div
              onClick={() => inputRef.current?.click()}
              className="todo-dropzone"
            >
              {preview ? (
                <img src={preview} alt="preview" />
              ) : (
                <>
                  <p className="todo-dropzone-text">{t.images.clickToSelect}</p>
                  <p className="todo-dropzone-hint">{t.images.fileTypes}</p>
                </>
              )}
            </div>
            {file && (
              <p className="todo-file-info">
                {file.name} — {(file.size / 1024).toFixed(1)} KB
              </p>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="todo-page-actions todo-actions">
            <button type="submit" className="btn-add" disabled={loading}>
              {loading ? t.common.loading : t.images.uploadButton}
            </button>
            <button
              type="button"
              className="btn-add btn-add--ghost"
              onClick={() => router.push("/imglist")}
            >
              {t.images.viewList}
            </button>
            <button
              type="button"
              className="btn-add btn-add--ghost"
              onClick={() => router.push("/")}
            >
              {t.common.home}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoadImg;
