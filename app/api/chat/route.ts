import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Buffer } from 'buffer';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

function fileToGenerativePart(buffer: Buffer, mimeType: string) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type;

    const prompt = 'Identify the movie or series from this scene. Respond with only the name of the movie or series';
    const image = fileToGenerativePart(buffer, mimeType!);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([prompt, image]);
    const responseText = result.response.text();

    // IMDB API call
    const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${responseText}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
        'x-rapidapi-host': 'imdb146.p.rapidapi.com'
      }
    };

    const imdbResponse = await fetch(url, options);
    const imdbData = await imdbResponse.json();

    const movieId = imdbData.titleResults.results[0].id
    return NextResponse.json({ success: true, movieId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export const config = {
  api: {
    bodyParser: false, 
  },
};
