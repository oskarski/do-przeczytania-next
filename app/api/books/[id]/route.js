import { sql } from "@vercel/postgres"

export const DELETE = async (request, { params }) => {
    const id = params.id;

    await sql`
        DELETE FROM books
        WHERE id = ${id};
    `

    return new Response();
}