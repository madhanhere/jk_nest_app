export class CONSTANTS {
  static get DB_CONN(): string {
    return 'posts';
  }

  static jwtConstants = {
    secret: '0d609697c6a77b6d193bed2f7fad066759628bf6e56e80e66f611526d02237d9',
    expiresAtString: '60m',
    expirsAtNumber: 3600,
  };

}
