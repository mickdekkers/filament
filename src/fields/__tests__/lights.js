import { query } from '../../test-setup/utils';

describe('{ lights }', () => {
  it('returns all lights', async () => {
    const response = await query`{
      lights { name }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.lights).toEqual(expect.any(Array));
    expect(response.data.lights.length).toBe(3);
  });

  it('contains each light ID', async () => {
    const response = await query`{
      lights { id }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.lights[0]).toEqual({ id: 1 });
  });

  it('contains all the light data', async () => {
    const response = await query`{
      lights {
        name uniqueid type manufacturername swversion modelid
      }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.lights[0]).toEqual({
      uniqueid: '75:45:12:38:00:fa:0c:26-1b',
      type: 'Extended color light',
      manufacturername: 'Philips',
      swversion: '5.23.1.13452',
      name: 'Light name',
      modelid: 'LCT001',
    });
  });
});
