### Modal Module

#### Usage
This is data driven based on ```data-toggle="modal"```
That's all you need to init the plugin.

**Example Setup**
````
<button data-toggle='modal' data-modal='{"content":"#my-modal"}'>Open Modal</button>
<div id="my-modal" class="modal">
  <div class="modal--content">
    <a data-modal="close" href="#" class="modal-close">×</a>
    <h4>Hello</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, ipsa,
      maiores, rerum nihil ut iste eius molestiae fugit blanditiis error 
      optio porro itaque voluptatibus quisquam incidunt autem rem natus 
      cupiditate.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, ipsa,
      maiores, rerum nihil ut iste eius molestiae fugit blanditiis error 
      optio porro itaque voluptatibus quisquam incidunt autem rem natus 
      cupiditate.
    </p>
    <img src="http://placeape.com/400/400" alt="">
  </div>
</div>
````