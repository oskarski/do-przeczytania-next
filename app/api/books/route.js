import { sql } from "@vercel/postgres"

export const GET = async (request) => {
    const booksQuery = await sql`
        SELECT * FROM books;
    `;

    const books = booksQuery.rows;

    return Response.json(books)
}