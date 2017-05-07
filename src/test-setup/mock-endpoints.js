import nock from 'nock';

import { url } from '../utils';

jest.mock('../../bridge.json', () => ({
  ip: '192.168.1.123',
  token: '4P170k3n4gr85ucc355',
}));

const createLight = (fields = {}) => ({
  uniqueid: '75:45:12:38:00:fa:0c:26-1b',
  type: 'Extended color light',
  manufacturername: 'Philips',
  swversion: '5.23.1.13452',
  name: 'Light name',
  modelid: 'LCT001',

  state: {
    xy: [0.3144, 0.3301],
    reachable: true,
    colormode: 'xy',
    effect: 'none',
    alert: 'none',
    hue: 34076,
    sat: 251,
    bri: 254,
    on: true,
    ct: 153,
  },

  ...fields,
});

const createGroup = (fields = {}) => ({
  name: 'Group name',
  class: 'Hallway',
  lights: [1, 2],
  recycle: true,
  type: 'Room',

  action: {
    alert: 'select',
    colormode: 'ct',
    effect: 'none',
    xy: [0.5, 0.5],
    hue: 10000,
    sat: 254,
    bri: 254,
    on: true,
    ct: 250,
  },

  state: {
    'all_on': false,
    'any_on': true,
  },

  ...fields,
});

const root = nock(url()).persist();

root.get('/lights').reply(200, {
  1: createLight(),
  2: createLight(),
  3: createLight(),
});

root.get('/lights/1').reply(200, createLight());

root.get('/groups').reply(200, {
  1: createGroup(),
  2: createGroup(),
  3: createGroup(),
});

root.get('/groups/2').reply(200, createGroup());
