export type Note = {
    id: string;
    content: string;
    createdAt: string;
};

export const notes: Note[] = [
    {
        id: '1',
        content: 'First mock note',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        content: 'Second mock note',
        createdAt: new Date().toISOString(),
    },
];
