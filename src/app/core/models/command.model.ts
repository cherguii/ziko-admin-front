import { Article } from "./article.model";
import { Transporteur, Utilisateur, Vendeur } from "./utilisateur.model";

export class CommandModel {
  id: string;
  NumeroCommand: string;
  NumeroReferenceTransporteur: string;
  //Vendeur: Vendeur;
  Acheteur: Utilisateur;
  Transporteur: Transporteur;
  Article: any;
  Quantite: number;
  Tva: string;
  PrixSousTotal: string;
  PrixTotal: string;
  TransporteurPrix: string;
  TransactionStatus: TransactionStatus;
  CreatedDate: Date;
  CreatedDateString: string;
  LastUpdatedDate: Date;
  LastUpdatedDateString: string;
  PriseEnChargeParTransporteurDate: Date;
  PriseEnChargeParTransporteurDateString: string;
  ReceptionClientDate: Date;
  ReceptionClientDateString: string;
  RetourClientDate: Date;
  RetourClientDateString: string;
}

export class CommandItem {
  id: string;
  ArticleId: string;
  PhotoArticle: string;
  NumeroCommand: string;
  TitreArticle: string;
  Quantite: string;
  NomPrenomAcheteur: string;
  TelephoneAcheteur: string;
  WilayaAcheteur: string;
  //CommuneAcheteur: string;
  CreatedDate: Date;
  CreatedDateString: string;
}

export class TransactionStatus {
  //id: string;
  Code: string;
  Libelle: string;
}