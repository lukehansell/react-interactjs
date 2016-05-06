import React from 'react'
import { shallow } from 'enzyme'

import Interactable from '../src/Interactable'

describe('Interactable', () => {
	let result

	beforeEach(() => {
		result = shallow(<Interactable />)
	})

	it('renders a div', () => {
		expect(result.find('div')).to.have.length(1)
	})

})