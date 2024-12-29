/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { IncomingMessage } from "http";
import { Readable } from "stream";

export function convertNextRequestToNodeRequest(req: NextRequest): IncomingMessage {
  const { headers, body, method, url } = req;

  // Buat stream dari body
  const readableBody = Readable.from(body as any);

  // Konstruksi object `IncomingMessage` secara manual
  const nodeRequest = Object.assign(readableBody, {
    headers: Object.fromEntries(headers),
    method,
    url,
  }) as IncomingMessage;

  // Tambahkan properti tambahan yang mungkin diperlukan oleh formidable
  nodeRequest.httpVersion = "1.1";
  nodeRequest.httpVersionMajor = 1;
  nodeRequest.httpVersionMinor = 1;
  nodeRequest.aborted = false;

  return nodeRequest;
}
