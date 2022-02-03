import * as Preact from '#preact';
import {BentoModal} from '../component';
import {mount} from 'enzyme';
import {waitFor} from '#testing/test-helper';

describes.sandboxed('BentoModal preact component v1.0', {}, (env) => {
  // DO NOT SUBMIT: This is example code only.
  it('should render', () => {
    const wrapper = mount(<BentoModal testProp={true} />);

    const component = wrapper.find(BentoModal.name);
    expect(component).to.have.lengthOf(1);
    expect(component.prop('testProp')).to.be.true;
  });
});
