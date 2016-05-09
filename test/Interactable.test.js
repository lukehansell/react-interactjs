import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import Interactable from '../src/Interactable'
import interact from 'interact.js'

const sandbox = sinon.sandbox.create()

describe('Interactable', () => {
	let result
	
	afterEach(() => {
		sandbox.restore()
	})

	context('without children', () => {
		it('errors', () => {
			expect(function() {
				mount(<Interactable />)
			}).to.throw
		})
	})

	context('with children', () => {

		beforeEach(() => {
			result = shallow(<Interactable><h1 /></Interactable>)
		})

		it('does not error', () => {
			expect(function() {
				mount(<Interactable><div /></Interactable>)
			}).not.to.throw
		})

		it('returns the children', () => {
			expect(result.find('h1')).to.have.length(1)
		})

		it('sets ref to child as this.node', () => {
			expect(result.node.type).to.equal('h1')
		})
	})

	describe('setInteractions', () => {
		beforeEach(() => {
			sandbox.spy(Interactable.prototype, 'setInteractions')
		})

		describe('on componentDidMount', () => {
			beforeEach(() => {
				mount(<Interactable><div /></Interactable>)
			})

			it('calls setInteractions', () => {
				expect(Interactable.prototype.setInteractions).to.have.been.calledOnce
			})
		})

		describe('on componentWillReceiveProps', () => {
			beforeEach(() => {
				const rendered = mount(<Interactable><div /></Interactable>)
				rendered.setProps({foo: 'bar'})
			})

			it('calls setInteractions', () => {
				expect(Interactable.prototype.setInteractions).to.have.been.calledTwice // once on mount, once on update
			})
		})

		context('when draggable is true', () => {
			beforeEach(() => {
				result = mount(<Interactable draggable><div /></Interactable>)
				sandbox.stub(result.node.interact, 'draggable')
				result.setProps({draggable: true})
			})

			it('calls interact.draggable', () => {
				expect(result.node.interact.draggable).to.have.been.called
			})

			describe('when draggableOptions are provided', () => {
				let options

				beforeEach(() => {
					options = {
						foo: 'bar'
					}
					result = mount(<Interactable draggable draggableOptions={options}><div /></Interactable>)
					sandbox.stub(result.node.interact, 'draggable')
					result.setProps({draggable: true})
				})

				it('calls interact.draggable with draggableOptions', () => {
					expect(result.node.interact.draggable).to.have.been.calledWith(options)
				})
			})
		})

		context('when draggable is false', () => {
			beforeEach(() => {
				result = mount(<Interactable><div /></Interactable>)
				sandbox.stub(result.node.interact, 'draggable')
				result.setProps({draggable: false})
			})

			it('does not call interact.draggable', () => {
				expect(result.node.interact.draggable).not.to.be.called
			})
		})
	})

})