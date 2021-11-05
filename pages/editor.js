import { Component } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

class Editor extends Component {
  componentDidMount() {
    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: 'auto',
      width: 'auto',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: { defaults: [] },
    });
    const components = editor.addComponents(`
    <section class="text-gray-600 body-font">
    <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <img
        class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
        alt="hero"
        src="https://dummyimage.com/720x600"
      />
      <div class="text-center lg:w-2/3 w-full">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Microdosing synth tattooed vexillologist
        </h1>
        <p class="mb-8 leading-relaxed">
          Meggings kinfolk echo park stumptown DIY, kale chips beard
          jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice
          godard disrupt ramps hexagon mustache umami snackwave tilde
          chillwave ugh. Pour-over meditation PBR&amp;B pickled ennui
          celiac mlkshk freegan photo booth af fingerstache pitchfork.
        </p>
        <div class="flex justify-center">
          <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
          <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
            Button
          </button>
        </div>
      </div>
    </div>
  </section>
  `);
    components.forEach(function (component) {
      component.set('draggable', false);
      component.set('removable', false);
      component.set('toolbar', [{ attributes: { class: '' }, command: '' }]);
    });
    const iframe = editor.Canvas.getFrameEl();

    if (!iframe) return;

    const cssLink = document.createElement('link');
    cssLink.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
    cssLink.rel = 'stylesheet';
    const cssStyle = document.createElement('style');
    cssStyle.innerHTML = `img.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`;

    // checks iframe is ready before loading Tailwind CSS - issue with firefox
    const f = setInterval(() => {
      const doc = iframe.contentDocument;
      if (doc.readyState === 'complete') {
        doc.head.appendChild(cssLink);
        doc.head.appendChild(cssStyle);
        clearInterval(f);
      }
    }, 100);
  }
  render() {
    return <div id="gjs"></div>;
  }
}

export default Editor;
