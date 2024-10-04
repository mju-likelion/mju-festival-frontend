export abstract class DateFormat {
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  abstract formatDate(): string;
}
