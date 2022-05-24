import { restapi, callApi } from './restapi';

describe('restapi', () => {
  it('should work', () => {
    expect(restapi()).toEqual('restapi');
  });

  describe('callApi', () => {
    it('should give data for a supported network', () => {
      expect(callApi(1)).toBeDefined();
    });
  
    it('should be not defined for an un supported network', () => {
      expect(callApi(100)).not.toBeDefined();
    });
  });
});
