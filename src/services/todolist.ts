type TodoListProps = {
    title: string;
    state: string;
    dataStart: Date | string;
    dataEnd?: Date | string;
};

type UpdateTaskProps = {
    id: string;
    state: string;
    dataStart?: Date | string;
    dataEnd?: Date | string;
};

type DeleteTaskProps = {
    id: string;
};

export const getTodolist = async () => {
    try {
        const res = await fetch("/api/todolist");
        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
}

export const addTask = async (task: TodoListProps) => {
    try {
        const res = await fetch("/api/todolist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return {
            data: null,
            code: 500,
            message: "No se pudo crear la tarea",
        };
    }
};

export const updateTask = async (task: UpdateTaskProps) => {
    try {
        const res = await fetch("/api/todolist", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return {
            data: null,
            code: 500,
            message: "No se pudo actualizar la tarea",
        };
    }
};

export const deleteTask = async (task: DeleteTaskProps) => {
    try {
        const res = await fetch("/api/todolist", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return {
            data: null,
            code: 500,
            message: "No se pudo eliminar la tarea",
        };
    }
};
