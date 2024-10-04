import { DateFormat } from './DateFormat';

export class DateOnlyFormat extends DateFormat {
  formatDate(): string {
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, '0');
    const day = String(this.date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
}
