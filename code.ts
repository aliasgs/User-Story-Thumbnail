let cover: PageNode;
let frame: FrameNode;

let bgHex = '#007CBF';


// This shows the HTML page in "ui.html".
figma.showUI(__html__);




function createPageAndFrame() {
  //creating page
  cover = figma.createPage();
  cover.name = 'Thumbnail';
  //setting background to bgHex variable
  cover.backgrounds = [
    {
      type: 'SOLID',
      color: {
        r: hexToRgb(bgHex).r,
        g: hexToRgb(bgHex).g,
        b: hexToRgb(bgHex).b,
      },
    },
  ];
  //setting current page to this new page
  figma.currentPage = cover;

  //insert new page at the top of the root (second page)
  figma.root.insertChild(0, cover);

  //creating frame
  frame = figma.createFrame();
  frame.name = 'Thumbnail';
  frame.resize(1600, 960);
  frame.fills = [
    {
      type: 'SOLID',
      color: {
        r: hexToRgb(bgHex).r,
        g: hexToRgb(bgHex).g,
        b: hexToRgb(bgHex).b,
      },
    },
  ];

  //zoom into frame
  const nodes = [];
  nodes.push(frame);
  figma.viewport.scrollAndZoomIntoView(nodes);

}



function createContent() {

  (async () => {

    const text = figma.createText()

    // Move to (50, 50)
    text.x = 50
    text.y = 50

    // Load the font in the text node before setting the characters
    await figma.loadFontAsync({ family: "Inter", style: "Regular" })
    text.characters = 'Hello world!'

    // Set bigger font size and red color
    text.fontSize = 48
    text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]


  })()

}



figma.ui.onmessage = msg => {
  if (msg.type === 'create-frame') {

    createPageAndFrame();
    figma.notify("frame created!");

  }

  if (msg.type === 'create-content') {
    createContent();
    figma.notify("content created!");

  }


  if (msg.type === 'set-as-thumbnail') {

    if (figma.currentPage.id === cover.id) {
      const template = figma.currentPage.findAllWithCriteria({
        types: ['FRAME']
      })

      figma.setFileThumbnailNodeAsync(template[0]);
      figma.notify("thumbnail set!")

    } else {
      figma.notify("Go to the Thumbnail page!")
    }



  }


  //figma.closePlugin();
};




function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255,
    }
    : null;
}