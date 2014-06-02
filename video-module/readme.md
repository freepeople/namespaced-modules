# Youtube / Vimeo Video Player Component
### Contributors
JS: CLohr and Matt Norton
HTML/CSS: Matt Norton 


### Usage
Video Component allows you to embed a Youtube and Vimeo video by applying Video ID _(data-video= )_ and Video Source _(data-source= )_. 

####Example
```html
   	<section class="featured_video" >
            <div class="featured_video_holder"></div>
            <a href="#" class="launch_featured" data-video="87571528" data-source="vimeo">
               <img src="img/Free-People-Sun-Chaser-Video.jpg" alt="Free People Sun Chaser">
            </a>
    </section>
```

#### Youtube Options

| Options       | Values      |
| ------------- | ----------- 
| videoWidth    | px, % |
| videoHeight   | px, % |
| rel           | 0,1 *This option indicates whether the player will show related videos when playback of the initial video ends.*
| controls      | 0, 1, 2 -  *0 Only the flash player displays : 1 The controls display immediately and the Flash player also loads immediately. : 2 The controls display and the Flash player loads after the user initiates the video playback.* |
| loop          | 0,1 - *Loops playlist only* |
| list			| 0,1 - *Apply list ID which corespond with playlist (example: PLzAs7pubkF_guUNLe3WVSjt1Ws4oJ81sx)* |
| autoplay      | 0,1 - *Default option is 1, Setting option to 0 plays video after clicking play.* |
| showinfo      | 0,1 - *Defaults 1, Setting option to 0 displays video title & uploader.* |
| hd            | 360, 480, 720, 1080

#### Vimeo Options

| Options       | Values      |
| ------------- | ----------- 
| videoWidth    | px, % |
| videoHeight   | px, % |
| loop          | 0,1 - *Loops playlist only* |
| autoplay      | 0,1 - *Default option is 1, Setting option to 0 plays video after clicking play.* |
| showinfo      | 0,1 - *Defaults 1, Setting option to 0 displays video title & uploader.* |
