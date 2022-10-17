import ical, { ICalEventRepeatingFreq } from 'ical-generator';
import * as fs from 'fs';

const calendar = ical({ name: 'Birthday Calendar' });

const csv = fs.readFileSync('birthdays.csv', 'utf8');

for (const line of csv.split("\n")) {
    const [name, day] = line.split(";");
    if (name && day) {
        const date = new Date(day);
        date.setHours(10);
        calendar.createEvent({
            start: date,
            allDay: true,
            summary: name,
            repeating: {
                freq: ICalEventRepeatingFreq.YEARLY,
            },
        });
    }
}

calendar.saveSync("birthdays.ics");
