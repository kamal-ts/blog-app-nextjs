import { NextResponse } from "next/server";

export function applyCors(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Origin", "*"); // Ganti dengan domain yang diizinkan
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return response;
}
