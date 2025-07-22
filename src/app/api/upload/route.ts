import { createClient } from '@supabase/supabase-js'
import postgres from 'postgres';

const sql = postgres(process.env.SUPABASE_POSTGRES_URL!, { ssl: 'require' });

const supabase = createClient(
  process.env.SUPABASE_SUPABASE_URL!,
  process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY! // use env variable, NOT the anon key
)

export async function POST(req: Request) {
  try {
    const { imageData, name } = await req.json()

    const base64 = imageData.replace(/^data:image\/png;base64,/, "")
    const buffer = Buffer.from(base64, "base64")

    const fileName = `${name}_${Date.now()}.png`

    const { data, error } = await supabase.storage
      .from("stickers")
      .upload(fileName, buffer, {
        contentType: "image/png",
      })

    if (error) {
      console.error(error)
      return new Response("Failed to upload", { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage
      .from("stickers")
      .getPublicUrl(fileName)

    await supabase.storage
      .from("stickers")
      .createSignedUrl(fileName, 60 * 60 * 24 * 30).then(async(response)=>{
        const {data} = response;
        if(data)
        await sql`
            INSERT INTO stickers (name, url, signed_url)
            VALUES (${fileName}, ${publicUrlData.publicUrl}, ${data.signedUrl})
        `;
      } 
      )

    return Response.json({ url: publicUrlData.publicUrl })
  } catch (err) {
    console.error(err)
    return new Response("Server Error", { status: 500 })
  }
}
