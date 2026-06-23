"use client";

import { getImgs } from "@/src/services/img";
import { useTranslation } from "@/src/context/i18nContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ImgItem {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
}

const ImgList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [images, setImages] = useState<ImgItem[]>([]);

  const fetchData = async () => {
    const result = await getImgs();
    setImages(result?.data ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="root" className="todo-app">
      <header className="todo-header">
        <h1>{t.images.listTitle}</h1>
        <p className="todo-subtitle">{t.images.listSubtitle}</p>
      </header>

      <div className="todo-page-actions todo-actions">
        <button
          type="button"
          className="btn-add"
          onClick={() => router.push("/loadimg")}
        >
          {t.images.uploadNew}
        </button>
        <button
          type="button"
          className="btn-add btn-add--ghost"
          onClick={() => router.push("/")}
        >
          {t.common.home}
        </button>
      </div>

      {images.length === 0 ? (
        <div className="todo-panel">
          <p className="column-empty">{t.images.emptyList}</p>
        </div>
      ) : (
        <div className="todo-grid">
          {images.map((img) => (
            <article key={img._id} className="todo-img-card">
              <img src={img.fileUrl} alt={img.title} />
              <h3>{img.title}</h3>
              <p>{img.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImgList;
