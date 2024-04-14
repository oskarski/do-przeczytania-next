import { sql } from "@vercel/postgres"

export const DELETE = async (request, { params }) => {
    const id = params.id;

    await sql`
        DELETE FROM books
        WHERE id = ${id};
    `

    return new Response();
}

export const PATCH = async (request, { params }) => {
    const id = params.id;
    const book = await request.json();

    const bookDetailsQuery = await sql`
        SELECT * FROM books
        WHERE id = ${id};
    `;
    const [bookDetails] = bookDetailsQuery.rows;
    
    await sql`
        UPDATE books SET 
        title = ${book.title || bookDetails.title},
        author = ${book.author || bookDetails.author},
        pinned = ${book.pinned === 'undefined' ?  bookDetails.pinned : book.pinned}
        WHERE id = ${id};
    `;

    const updatedBookQuery = await sql`
        SELECT * FROM books
        WHERE id = ${id};
    `;

    const [updatedBook] = updatedBookQuery.rows;

    return Response.json(updatedBook);
}