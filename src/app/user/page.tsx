"use client";

import { Button, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "@/src/context/Context";
import { getUsers } from "@/src/services/users";

interface personProps {
  name: string;
  code: number;
  message: string;
}

const User = () => {
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

  const goToAdmin = () => {
    router.push("/admin/users");
  };

  const goToBack = () => {
    router.back();
  };

  return (
    <>
      <h1>Vista de Users</h1>
      <div>La persona es: {person?.name}</div>
      <button onClick={goToAdmin}>Ir a admin</button>

      <Button variant="danger" onPress={goToBack}>
        Ir Atras
      </Button>

      <Chip>{name}</Chip>
      <Chip>{pi}</Chip>
    </>
  );
};

export default User;
