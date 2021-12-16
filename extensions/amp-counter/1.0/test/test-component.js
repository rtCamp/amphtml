import * as Preact from '#preact';
import {BentoCounter} from '../component';
import {mount} from 'enzyme';

describes.sandboxed('BentoCounter preact component v1.0', {}, (env) => {
  // DO NOT SUBMIT: This is example code only.
  it('should render', () => {
    const wrapper = mount(<BentoCounter testProp={true} />);

    const component = wrapper.find(BentoCounter.name);
    expect(component).to.have.lengthOf(1);
    expect(component.prop('testProp')).to.be.true;
  });
});
