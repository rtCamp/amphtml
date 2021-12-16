import * as Preact from '#preact';
import {BentoCurrencyConverter} from '../component';
import {mount} from 'enzyme';

describes.sandboxed(
  'BentoCurrencyConverter preact component v1.0',
  {},
  (env) => {
    // DO NOT SUBMIT: This is example code only.
    it('should render', () => {
      const wrapper = mount(<BentoCurrencyConverter testProp={true} />);

      const component = wrapper.find(BentoCurrencyConverter.name);
      expect(component).to.have.lengthOf(1);
      expect(component.prop('testProp')).to.be.true;
    });
  }
);
