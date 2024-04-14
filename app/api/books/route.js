import { sql } from "@vercel/postgres"

export const GET = async (request) => {
    const booksQuery = await sql`
        SELECT * FROM books;
    `;

    const books = booksQuery.rows;

    return Response.json(books)
}

export const POST = async (request) => {
    const book = await request.json();

    const idQuery = await sql`
        SELECT uuid_generate_v4() AS id;
    `;

    const [{ id }] = idQuery.rows;

    await sql`
        INSERT INTO books (id, title, author, pinned)
        VALUES (${id}, ${book.title}, ${book.author}, ${book.pinned});
    `;

    const bookQuery = await  sql`
        SELECT * FROM books
        WHERE id = ${id};
    `;

    const [createdBook] = bookQuery.rows;

    return Response.json(createdBook)
}