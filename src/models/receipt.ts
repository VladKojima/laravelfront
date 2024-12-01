export class Receipt {
    id: number;
    payment_id: number;
    receipt_number: number;
    amount: number;
    issued_at: Date;
    tax_amount: number;
    payment_method: any;
    pdf_url: string;
    status: any;

    constructor(model: Receipt) {
        this.id = model.id;
        this.payment_id = model.payment_id;
        this.receipt_number = model.receipt_number;
        this.amount = model.amount;
        this.issued_at = model.issued_at;
        this.tax_amount = model.tax_amount;
        this.pdf_url = model.pdf_url;
    }
}