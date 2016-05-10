import React from 'react'
import { render } from 'react-dom'
import Interactive from '../../src/Interactable'

const draggableOptions = {
	 onmove: event => {
		const target = event.target
	  // keep the dragged position in the data-x/data-y attributes
	  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
	  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

	  // translate the element
	  target.style.webkitTransform =
	  target.style.transform =
	    'translate(' + x + 'px, ' + y + 'px)'

	  // update the posiion attributes
	  target.setAttribute('data-x', x);
	  target.setAttribute('data-y', y);
	}
}

const example = (
  <div>
    <h2>Draggable</h2>
      <Interactive draggable draggableOptions={draggableOptions}>
        <img src="https://pbs.twimg.com/profile_images/526421493731717120/INda0NaM.png" height={100} width={100}/>
    </Interactive>
  </div>
)

render(example, document.getElementById('container'));