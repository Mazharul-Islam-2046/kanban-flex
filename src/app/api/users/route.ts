


export async function GET() {
    try {
        // Simulate fetching user data
        const users = [
            { id: 1, name: 'John Doe', email: 'IhOgM@example.com' },
            { id: 2, name: 'Jane Smith', email: '0B2bH@example.com' },
        ];

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response('Error fetching users', { status: 500 });
    }
}