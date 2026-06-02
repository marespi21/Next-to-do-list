 /*ESTO ES PARA CONECTAR UNA API */

export async function GET (){
    const data = "Cami"

    console.log("se llama la funcion");

    return Response.json({
        name: data,
        code: 200,
        nessage: "Hello World",
    })
}
