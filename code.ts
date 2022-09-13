let coverPage: PageNode;
let frame: FrameNode;

let bgHex = '#007CBF';


// This shows the HTML page in "ui.html".
figma.showUI(__html__,
    { width: 250, height: 600, title: "User Story Thumbnail" }
)



function createPageAndFrame() {
  //creating page
  coverPage = figma.createPage();
  coverPage.name = '[User Story]';
  //setting background to bgHex variable
  coverPage.backgrounds = [
    {
      type: 'SOLID',
      color: {
        r: 1,
        g: 1,
        b: 1,
      },
    },
  ];
  //setting current page to this new page
  figma.currentPage = coverPage;

  //insert new page at the top of the root (second page)
  figma.root.insertChild(0, coverPage);

  //creating frame
  frame = figma.createFrame();
  frame.name = '[User Story]';
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



function createContent(type, _messages: any, y: number) {

  (async () => {

    const PageNode = figma.root.findOne(n => n.name === "[User Story]") as PageNode;
    const FrameNode = PageNode.findOne(n => n.name === "[User Story]") as FrameNode;
   
  
    
    if (type === "product") {
      const text = figma.createText()
      text.x = 50
      text.y = y

      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      await figma.loadFontAsync({ family: "Inter", style: "Bold" })
      text.characters = "Product:";
      text.fontName = {
        family: "Inter",
        style: "Bold"
      }
      text.fontSize = 25
      text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]

      FrameNode.appendChild(text);


      const text1 = figma.createText()
      text1.x = 50
      text1.y = y + 25
      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      text1.characters = _messages;
      text1.name = "product_name";
      text1.fontSize = 48
      text1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  
      FrameNode.appendChild(text1);
     
    }
    if (type === "id") {
      const text = figma.createText()
      text.x = 50
      text.y = y

      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      text.characters = "User Story ID:";

      text.fontSize = 25
      text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]

      FrameNode.appendChild(text);

      const text1 = figma.createText()
      text1.x = 50
      text1.y = y + 25
      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      text1.characters = _messages;
      text1.name = "US_ID_name";

      text1.fontSize = 48
      text1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  
      FrameNode.appendChild(text1);
    }
    if (type === "title") {
      const text = figma.createText()
      text.x = 50
      text.y = y

      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      text.characters = "User Story Title:";

      text.fontSize = 25
      text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]

      FrameNode.appendChild(text);

      const text1 = figma.createText()
      text1.x = 50
      text1.y = y + 25
      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      text1.characters = _messages;
      text1.name = "US_title_name";

      text1.fontSize = 48
      text1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  
      FrameNode.appendChild(text1);
    }
    if (type === "status") {
      const text = figma.createText()
      text.x = 50
      text.y = y

      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      text.characters = "User Story Status:";

      text.fontSize = 25
      text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]

      FrameNode.appendChild(text);

      const text1 = figma.createText()
      text1.x = 50
      text1.y = y + 25
      // Load the font in the text node before setting the characters
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      text1.characters = _messages;
      text1.name = "US_status_name";

      text1.fontSize = 48
      text1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  
      FrameNode.appendChild(text1);
    }



  })()

}



figma.ui.onmessage = msg => {

    if(msg.type=='refresh'){

            //sync values
            const PageNode = figma.root.findOne(n => n.name === "[User Story]") as PageNode;

            if(PageNode){
              const FrameNode = PageNode.findOne(n => n.name === "[User Story]") as FrameNode;
              const children = FrameNode.children;
              //console.log(children);
              if(children.length > 0){
                let message_array: Array<string> = [];
                for (let i = 0; i < children.length; i++) {
                  if(children[i].name == "product_name"){
                    //console.log((children[i] as TextNode).characters);
                    message_array.splice(0,0,(children[i] as TextNode).characters);
                    //console.log(message_array);
                  }
                  if(children[i].name == "US_ID_name"){
                    //console.log((children[i] as TextNode).characters);
                    message_array.splice(1,0,(children[i] as TextNode).characters);
                    //console.log(message_array);
                  }
                  if(children[i].name == "US_title_name"){
                    //console.log((children[i] as TextNode).characters);
                    message_array.splice(2,0,(children[i] as TextNode).characters);
                    //console.log(message_array);
                  }
                  if(children[i].name == "US_status_name"){
                    //console.log((children[i] as TextNode).characters);
                    message_array.splice(3,0,(children[i] as TextNode).characters);
                    //console.log(message_array);
                  }

                }
                figma.ui.postMessage(message_array[0] + "," + message_array[1] + "," + message_array[2] + "," + message_array[3]);
              }else{
                figma.notify("No data")
              }
            }
    }else{



    if (figma.root.findOne(n => n.name === "[User Story]") === null) {
      createPageAndFrame();
      figma.notify("frame created!");
    }
    
  


 
  

    const PageNode = figma.root.findOne(n => n.name === "[User Story]") as PageNode;
    const FrameNode = PageNode.findOne(n => n.name === "[User Story]") as FrameNode;
    const children = FrameNode.children;
    if(children.length > 0){
        for (let i = 0; i < children.length; i++) {
        children[i].remove();
      }
    }

    var messages = msg.split(',');
    var product = messages[0];
    var US_ID = messages[1];
    var US_title = messages[2];
    var US_status = messages[3];

    createContent("product", product, 50);
    createContent("id", US_ID, 250);
    createContent("title", US_title, 400);
    createContent("status", US_status, 550);


    if (FrameNode) {
      figma.setFileThumbnailNodeAsync(FrameNode);
      figma.notify("thumbnail set!")
    }

  
  }
}


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

