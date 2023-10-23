import { generateTimestamp } from '../utils/helpers';

class AnalyticsService {
  static sendEvent(type: string, payload: object) {
    const timestamp = generateTimestamp();
    const event = { type, payload, timestamp };

    console.log(`sendEvent (${type})`, event) // пока просто выводим в консоль, но вообще это должно быть отправлено на сервер

    fetch('/api/sendEvent', {
      method: 'GET', // POST
      headers: {
        'Content-Type': 'application/json'
      },
       // body: JSON.stringify(event)
    });
  }
}

export default AnalyticsService;
