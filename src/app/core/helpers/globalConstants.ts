
export class TransactionStatusCodeConstante {
  static CreatationCode: number = 1;
  static PrisEnChargeParTransporteurCode: number = 2;
  static RecusEtPayerParClientCode: number = 3;
  static RecusEtRetournerParClientCode: number = 4;
  static NonRecusParClientCode: number = 5;
}

export enum  TransactionStatusLibelleConstante {
  CreatationLibelle = 'Créatation',
  PrisEnChargeParTransporteurLibelle = 'Pris en charge par transporteur',
  RecusEtPayerParClientLibelle = 'Reçus et payer par client',
  RecusEtRetournerParClientLibelle = 'Reçus et retourner par client',
  NonRecusParClientLibelle = 'Non reçus par client'
}