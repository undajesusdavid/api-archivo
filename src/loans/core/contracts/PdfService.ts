export const PDF_SERVICE = Symbol('PdfService');

export interface PdfService {
  generateLoanActa(loan: any, requester: any, target: any): Promise<Buffer>;
}
