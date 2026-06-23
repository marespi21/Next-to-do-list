"use client";

import { Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "@/src/context/Context";
import { getUsers } from "@/src/services/users";
import { useTranslation } from "@/src/context/i18nContext";

interface personProps {
  name: string;
  code: number;
  message: string;
}

const User = () => {
  const { t } = useTranslation();
  const [person, setPerson] = useState<personProps>();
  const { name, pi } = useContext(ContextGlobal);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsers();
      setPerson(result);
    };

    fetchData();
  }, []);

  return (
    <div id="root" className="todo-app">
      <header className="todo-header">
        <h1>{t.user.title}</h1>
      </header>

      <div className="todo-panel todo-content-block">
        <p>
          {t.user.person} {person?.name}
        </p>

        <div className="todo-page-actions todo-actions">
          <button
            type="button"
            className="btn-add"
            onClick={() => router.push("/admin/users")}
          >
            {t.user.goToAdmin}
          </button>
          <button
            type="button"
            className="btn-add btn-add--ghost"
            onClick={() => router.back()}
          >
            {t.common.back}
          </button>
          <button
            type="button"
            className="btn-add btn-add--ghost"
            onClick={() => router.push("/")}
          >
            {t.common.home}
          </button>
        </div>

        <div className="todo-actions">
          <Chip>{name}</Chip>
          <Chip>{pi}</Chip>
        </div>
      </div>
    </div>
  );
};

export default User;
