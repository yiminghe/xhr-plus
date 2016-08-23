/**
 * test cases for form serialization
 * @author yiminghe@gmail.com
 */

import $ from 'jquery';
import io from '../../index';
import utils from '../../src/utils';
import expect from 'expect.js';
import isPhantomjs from './isPhantomjs';

if (!isPhantomjs) {
  describe('Form serialize', () => {
    // https://github.com/kissyteam/kissy/issues/668
    it('works for same name input', () => {
      const html = '<form><input name="t"><input name="t"></form>';
      const form = $(html).appendTo('body');
      const ret = io.serialize(form[0]);
      expect(ret).to.be('t=&t=');
      const data = io.getFormData(form[0]);
      expect(data).to.eql({
        t: ['', ''],
      });
      form.remove();
    });

    it('works in single condition', () => {
      const html = `<form>
          <div><input type="text" name="a" value="1" id="a" /></div>
          <div><input type="text" name="b" value="2" id="b" /></div>
          <div><input type="hidden" name="c" value="3" id="c" /></div>
          <div>
          <textarea name="d" rows="8" cols="40">4</textarea>
          </div>
          <div>
          <select name="e">
          <option value="5" selected="selected">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          </select>
          </div>
          <div>
          <input type="checkbox" name="f" value="8" id="f" />
          </div>
          <div>
          <input type="submit" name="g" value="Submit" id="g" />
          </div>
          </form>`;
      const form = $(html).appendTo('body');
      const ret = io.serialize(form[0]);

      expect(ret).to.be('a=1&b=2&c=3&d=4&e=5');

      expect(io.serialize(utils.makeArray(form.find('input')))).to.be('a=1&b=2&c=3');

      expect(io.serialize(utils.makeArray(form.find('input')), true)).to.be('a=1&b=2&c=3');

      form.remove();
    });

    it('works in multiple condition', () => {
      const html = `<form>
          <select name="single">
           <option>Single</option>
          <option>Single2</option>
           </select>
          <input name="multiple" value="Multiple"/>  <br />
          <input name="multiple" value="Multiple3"/>  <br />
            <input type="checkbox" name="check" value="check1" checked="checked" id="ch1"/>
          <label for="ch1">check1</label>
           <input type="checkbox" name="check" value="check2" checked="checked" id="ch2"/>
           <label for="ch2">check2</label>
            <br />
          <input type="radio" name="radio" value="radio1" checked="checked" id="r1"/>
          <label for="r1">radio1</label>
           <input type="radio" name="radio" value="radio2" id="r2"/>
           <label for="r2">radio2</label>
            </form>`;
      const form = $(html).appendTo('body');

      let ret = io.serialize(form[0]);

      expect(ret).to.be('single=Single&multiple=Multiple&multiple=Multiple3' +
        '&check=check1&check=check2&radio=radio1');

      ret = io.serialize(form[0], true);

      const kuo = encodeURIComponent('[]');

      expect(ret).to.be(`single=Single&multiple${kuo}\
=Multiple&multiple${kuo}\
=Multiple3\
&check${kuo}\
=check1&check${kuo}\
=check2&radio=radio1`);

      form.remove();
    });
  });
}
