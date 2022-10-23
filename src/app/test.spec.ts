import {Calculator} from './testService';

describe('testService',()=>{
  it('should add 2 numbers',()=>{
    const service=new Calculator();
    expect(service.add(2,2)).toBe(4);
  });

  it('should substract 2 numbers',()=>{
    const service=new Calculator();
    expect(service.sub(6,2)).toBe(4);
  });

  it('should multiply 2 numbers',()=>{
    const service=new Calculator();
    expect(service.mul(2,2)).toBe(4);
  });
})
