figma.showUI(__html__);

// figma.ui.onmessage = (msg) => {
//   if (msg.type === 'create-rectangles') {
//     const nodes = [];

//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle();
//       rect.x = i * 150;
//       rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
//       figma.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }

//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);

//     // This is how figma responds back to the ui
//     figma.ui.postMessage({
//       type: 'create-rectangles',
//       message: `Created ${msg.count} Rectangles`,
//     });
//   }

//   figma.closePlugin();
// };
console.log("plugin running")
figma.ui.onmessage = msg => {
  console.log("onmsg")
  if (msg.type === 'create-react-code') {
    console.log("create-react-code")
    const selectedNodes = figma.currentPage.selection;
    if (selectedNodes.length === 0) {
      figma.notify('No layers are selected');
      return;
    }

    let reactCode = '';

    selectedNodes.forEach(node => {
      console.log("selectednodes loop", node.type)
      // For simplicity, we'll only handle rectangles
      if (node.type === 'RECTANGLE' && Array.isArray(node.fills) && node.fills.length > 0) {
        console.log("create react code: ", node)
        const color = node.fills[0].color;
        const rgbColor = `rgb(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)})`;
    
        reactCode += `<div style={{width: '${node.width}px', height: '${node.height}px', backgroundColor: '${rgbColor}'}}></div>\n`;
      }
      if (node.type === 'GROUP') {
        // console.log("node.name: ", node.name)
        reactCode += `<div class="group">`;
        node.children.forEach((child) => {
          if (child.type === 'COMPONENT') {
            // console.log("node.name: ", child.name)
            if (child.name === 'Button/Active/Large/True/True') {
              reactCode += `<button active large primary theme={dark} />`
            }
          }
          if (child.type === 'INSTANCE' && child.name === 'Input') {
            let text;
            child.children.forEach((item) => {
              console.log({item})
              if (item.type === 'TEXT') {
                text = item.characters
              }
            })
            reactCode += `<input icon large primary theme={dark}>${text}</input>`
          }
          if (child.type === 'RECTANGLE' && Array.isArray(child.fills) && child.fills.length > 0) {
            // console.log("create react code: ", node)
            const color = child.fills[0].color;
            const rgbColor = `rgb(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)})`;
        
            reactCode += `<div style={{width: '${child.width}px', height: '${child.height}px', backgroundColor: '${rgbColor}'}}></div>\n`;
          }
        })
        
        
        reactCode += `</div>`;
      }
      
      
    });

    figma.ui.postMessage({ type: 'react-code', code: reactCode });
  }
};
