//SERVICIOS COMO USUARIOS, PRODUCTOS ...

export const getUsers = async () => {
    const res = await fetch("/api/hello");
    const data = await res.json();

    return data;
}