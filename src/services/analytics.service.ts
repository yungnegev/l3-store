import { generateTimestamp } from '../utils/helpers';

class AnalyticsService {
  static sendEvent(type: string, payload: object) {
    const timestamp = generateTimestamp();
    const event = { type, payload, timestamp };

    console.log(`sendEvent (${type})`, event) // rm

    fetch('/api/sendEvent', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(event)
    });
  }
}

export default AnalyticsService;
