import { query, bridge } from '../../test-setup/utils';

describe('mutation { group }', () => {
  const success = [{ success: { '/groups/5/action/on': true } }];
  const setup = () => bridge.put('/groups/5/action').reply(200, success);

  it('sets the group state', async () => {
    const endpoint = setup();

    const response = await query`mutation {
      group(id: 5, on: false)
    }`;

    expect(response.errors).toBeFalsy();
    endpoint.done();
  });

  it('fails if the endpoint fails', async () => {
    const endpoint = bridge.put('/groups/5/action')
      .reply(500, [{
        error: {
          type: 7,
          address: '/groups/5',
          description: 'Invalid potato. Please provide potato.',
        },
      }]);

    const response = await query`mutation {
      group(id: 5, on: true)
    }`;

    expect(response.errors).toBeTruthy();
    endpoint.done();
  });

  it('turns the lights on', async () => {
    const endpoint = bridge.put('/groups/10/action')
      .reply(200, (url, data) => {
        const action = JSON.parse(data);
        expect(action).toEqual({ on: true });

        return success;
      });

    const response = await query`mutation {
      group(id: 10, on: true)
    }`;

    expect(response.errors).toBeFalsy();
    endpoint.done();
  });

  it('applies hue, saturation, & brightness', async () => {
    const endpoint = bridge.put('/groups/15/action')
      .reply(200, (url, data) => {
        const action = JSON.parse(data);
        expect(action).toEqual({ hue: 150, sat: 200, bri: 254 });

        return success;
      });

    const response = await query`mutation {
      group(id: 15, hue: 150, sat: 200, bri: 254)
    }`;

    expect(response.errors).toBeFalsy();
    endpoint.done();
  });

  it('uses the given transition time', async () => {
    const endpoint = bridge.put('/groups/5/action')
      .reply(200, (url, data) => {
        const action = JSON.parse(data);
        expect(action).toEqual({ transitiontime: 10 });

        return success;
      });

    const response = await query`mutation {
      group(id: 5, transition: 1000)
    }`;

    expect(response.errors).toBeFalsy();
    endpoint.done();
  });
});
