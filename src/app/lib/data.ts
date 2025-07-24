'use server';

import postgres from 'postgres';
import { StickerImageType } from './definitions';

const sql = postgres(process.env.SUPABASE_POSTGRES_URL!, { ssl: 'require' });

export async function fetchStickerImages(): Promise<StickerImageType[] | null> {
    try {
        console.log('Fetching sticker images...');
        const response = await sql<StickerImageType[]>`
            SELECT * FROM stickers
        `;
        console.log('Fetched:', response.length, 'stickers');
        return response 
        
    } catch (error) {
        console.error(error)
        return null
    }
}

