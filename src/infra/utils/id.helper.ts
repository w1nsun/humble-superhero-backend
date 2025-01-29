import { v4 as uuidv4 } from 'uuid';

export class IdHelper {
  static genID(): string {
    try {
      return uuidv4();
    } catch {
      throw new Error('Failed to generate UUID');
    }
  }
}
