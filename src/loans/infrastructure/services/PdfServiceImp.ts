import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { type PdfService } from '../../core/contracts/PdfService';

@Injectable()
export class PdfServiceImp implements PdfService {
  async generateLoanActa(loan: any, requester: any, target: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // PDF Content
      doc.fontSize(20).text('ACTA DE PRÉSTAMO DE ARCHIVO', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`ID de Préstamo: ${loan.id}`);
      doc.text(`Fecha de Solicitud: ${loan.requestDate.toLocaleDateString()}`);
      doc.text(`Fecha de Salida: ${loan.loanDate ? loan.loanDate.toLocaleDateString() : 'N/A'}`);
      doc.text(`Fecha Prevista de Devolución: ${loan.dueDate ? loan.dueDate.toLocaleDateString() : 'N/A'}`);
      doc.moveDown();

      doc.fontSize(14).text('Datos del Solicitante:');
      doc.fontSize(12).text(`Nombre: ${requester.username}`);
      doc.text(`Email: ${requester.email}`);
      doc.moveDown();

      doc.fontSize(14).text('Detalles del Documento/Expediente:');
      doc.fontSize(12).text(`Tipo: ${loan.targetType}`);
      doc.text(`Código: ${target.code}`);
      doc.text(`Ubicación Física: ${target.locationCode || 'N/A'}`);
      doc.moveDown();

      doc.fontSize(10).text('Este documento sirve como constancia oficial de préstamo. El solicitante se compromete a devolver la unidad documental en el estado en que fue entregada.', { align: 'justify' });

      doc.end();
    });
  }
}
