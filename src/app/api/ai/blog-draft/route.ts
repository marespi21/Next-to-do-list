import OpenAI from "openai";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_KEY || process.env.OPEN_AI;

  if (!apiKey) {
    return Response.json(
      { error: "API key de OpenAI no configurada" },
      { status: 500 },
    );
  }

  const { titulo } = await request.json();

  if (!titulo?.trim()) {
    return Response.json({ error: "El título es requerido" }, { status: 400 });
  }

  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Eres un escritor experto en blogs de tecnología. Genera borradores completos y bien estructurados en formato markdown.",
      },
      {
        role: "user",
        content: `Escribe un borrador completo de blog en markdown para el título: "${titulo}".
Incluye: introducción atractiva, al menos 3 secciones con subtítulos H2, ejemplos prácticos y una conclusión.`,
      },
    ],
  });

  const borrador = completion.choices[0].message.content ?? "";

  return Response.json({ borrador });
}
