import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {

    const data = await  request.json()
    const movieId = data.movieId

    const url = `https://imdb146.p.rapidapi.com/v1/title/?id=${movieId}`;
	const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
		'x-rapidapi-host': 'imdb146.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    return NextResponse.json(result)
} catch (error) {
	return NextResponse.json({status:404})
}
    
}