import * as Preact from '#preact';
import {BentoHelloWorld} from '../component';
import {mount} from 'enzyme';

describes.sandboxed('BentoHelloWorld preact component v1.0', {}, (env) => {
  // DO NOT SUBMIT: This is example code only.
  it('should render', () => {
    const wrapper = mount(<BentoHelloWorld testProp={true} />);

    const component = wrapper.find(BentoHelloWorld.name);
    expect(component).to.have.lengthOf(1);
    expect(component.prop('testProp')).to.be.true;
  });
});
