import * as Preact from '#preact';
import {BentoGreeting} from '../component';
import {mount} from 'enzyme';

describes.sandboxed('BentoGreeting preact component v1.0', {}, (env) => {
  // DO NOT SUBMIT: This is example code only.
  it('should render', () => {
    const wrapper = mount(<BentoGreeting testProp={true} />);

    const component = wrapper.find(BentoGreeting.name);
    expect(component).to.have.lengthOf(1);
    expect(component.prop('testProp')).to.be.true;
  });
});
