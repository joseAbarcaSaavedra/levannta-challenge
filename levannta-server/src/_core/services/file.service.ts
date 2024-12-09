import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import * as csv from 'csv-parser';
@Injectable()
export class FileService {
  async parseCsv(buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const stream = Readable.from(buffer.toString()); // Convierte el buffer a un stream legible
      stream
        .pipe(csv()) // Usa csv-parser para leer el contenido
        .on('data', (data: any) => results.push(data)) // Agrega cada fila al array
        .on('end', () => resolve(results)) // Resuelve con los datos procesados
        .on('error', (error: any) => reject(error)); // Maneja errores
    });
  }
}
