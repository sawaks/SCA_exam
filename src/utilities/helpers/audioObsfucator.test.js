import { decrypt, encrypt } from './audioObsfucator';

describe('test decrypt and encrypt functionality ', () => {
  // const url = 'https://www.google.com/';
  const audioUrl = 'https://traffic.omny.fm/d/clips/566281f8-200e-4c9f-8378-a4870055423bb2a6e127-8574-496c-9e45-acdb00620c59/fa3b5332-5a2a-4698-b16f-ad09000b49dc/audio.mp3';

  // decrypt function
  test('decrypt', () => {
    const result = decrypt();
    expect(result).toBe('');
  });
  test('decrypt', () => {
    const result = decrypt(audioUrl);
    const expecting = Buffer.from(audioUrl, 'base64').toString(); // "��i�����߉�&�'���ܖ*l�����_�����s���~���<�M9獷m����v��9��>��9��oM:�G9���ݾw�o�kf��|��z���4Ѿ=u�ڹب��"
    expect(result).toBe(expecting);
  });

  // encrypt function
  test('encrypt', () => {
    const result = encrypt();
    expect(result).toBe('');
  });
  test('encrypt', () => {
    const result = encrypt(audioUrl);
    const expecting = Buffer.from(audioUrl).toString('base64');
    // eslint-disable-next-line max-len
    // "aHR0cHM6Ly90cmFmZmljLm9tbnkuZm0vZC9jbGlwcy81NjYyODFmOC0yMDBlLTRjOWYtODM3OC1hNDg3MDA1NTQyM2JiMmE2ZTEyNy04NTc0LTQ5NmMtOWU0NS1hY2RiMDA2MjBjNTkvZmEzYjUzMzItNWEyYS00Njk4LWIxNmYtYWQwOTAwMGI0OWRjL2F1ZGlvLm1wMw=="
    expect(result).toBe(expecting);
  });
});
