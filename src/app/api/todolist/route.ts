import Todolist from "@/src/database/models/todolist";
import connectionDB from "@/src/lib/database";

export async function GET () {
    try {
        await connectionDB();
        const datos = await Todolist.find({});

        return Response.json(
            {
                data: datos,
                code: 200,
                message: "El servicio respondio correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                code: 500,
                message: "Error al obtener las tareas",
                error: error instanceof Error ? error.message : "Error desconocido",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectionDB();

        const body = await request.json();
        const { title, state, dataStart, dataEnd } = body;

        if (!title || !state || !dataStart) {
            return Response.json(
                {
                    code: 400,
                    message: "title, state y dataStart son obligatorios",
                },
                { status: 400 }
            );
        }

        const nuevaTarea = await Todolist.create({
            title,
            state,
            dataStart,
            dataEnd,
        });

        return Response.json(
            {
                data: nuevaTarea,
                code: 201,
                message: "Tarea creada correctamente",
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            {
                code: 500,
                message: "Error al crear la tarea",
                error: error instanceof Error ? error.message : "Error desconocido",
            },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        await connectionDB();

        const body = await request.json();
        const { id, state, dataStart, dataEnd } = body;

        if (!id || !state) {
            return Response.json(
                {
                    code: 400,
                    message: "id y state son obligatorios",
                },
                { status: 400 }
            );
        }

        const tareaActualizada = await Todolist.findByIdAndUpdate(
            id,
            {
                state,
                dataStart,
                dataEnd,
            },
            { new: true }
        );

        if (!tareaActualizada) {
            return Response.json(
                {
                    code: 404,
                    message: "No se encontro la tarea",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                data: tareaActualizada,
                code: 200,
                message: "Tarea actualizada correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                code: 500,
                message: "Error al actualizar la tarea",
                error: error instanceof Error ? error.message : "Error desconocido",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        await connectionDB();

        const body = await request.json();
        const { id } = body;

        if (!id) {
            return Response.json(
                {
                    code: 400,
                    message: "id es obligatorio",
                },
                { status: 400 }
            );
        }

        const tareaEliminada = await Todolist.findByIdAndDelete(id);

        if (!tareaEliminada) {
            return Response.json(
                {
                    code: 404,
                    message: "No se encontro la tarea",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                data: tareaEliminada,
                code: 200,
                message: "Tarea eliminada correctamente",
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                code: 500,
                message: "Error al eliminar la tarea",
                error: error instanceof Error ? error.message : "Error desconocido",
            },
            { status: 500 }
        );
    }
}