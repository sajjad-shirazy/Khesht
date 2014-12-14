interface PersianDate {
    format(settings?: string): string;
    toDate(): Date;
}
interface String {
    toPersianDigit(): string;
}
declare var persianDate: (initialValue?:any) => PersianDate;