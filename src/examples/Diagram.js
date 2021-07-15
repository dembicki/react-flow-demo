import {useState} from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faAws } from '@fortawesome/free-brands-svg-icons'

function Diagram() {
   const initialElements = [
     //main nodes
    {
      id: 'main',
      type: 'input',
      data: {
        label: (
          <>
            Welcome to <strong>Your app!</strong>
          </>
        ),
      },
      position: { x: 350, y: 0 },
    },
    {
      id: 'fe',
      data: {
        label: (
          <>
            This is a <strong>Frontend</strong>
          </>
        ),
      },
      position: { x: 100, y: 100 },
    },
    {
      id: 'be',
      data: {
        label: (
          <>
            This is a <strong>Backend</strong>
          </>
        ),
      },
      position: { x: 320, y: 100 },
      style: {
        background: '#D6D5E6',
        color: '#333',
        border: '1px solid #222138',
        width: 180,
      },
    },
    {
      id: 'cl',
      data: {
        label: (
          <>
            This is a <strong>Cloud Services</strong>
          </>
        ),
      },
      position: { x: 600, y: 100 },
    },
    //backend features
    {
      id: 'be-1',
      type: 'output',
      position: { x: 335, y: 200 },
      data: {
        label: 'REST API',
      },
    },
    
    {
      id: 're',
      data: { label: (
        <>
          <FontAwesomeIcon icon={faReact} style={{marginRight: '10px'}}/>
          React App
        </>
      ) },
      position: { x: 50, y: 200 },
    },
    //cloud features
    {
      id: 'cl-1',
      type: 'output',
      data: { label: (
        <>
          <FontAwesomeIcon icon={faAws} style={{marginRight: '10px'}}/>
          AWS
        </>
      ) },
      position: { x: 600, y: 200 },
    },
    // frontend features
    {
      id: 'fe-1',
      type: 'output',
      data: { label: 'User auth' },
      position: { x: 50, y: 300 },
    },
    {
      id: 'fe-2',
      type: 'output',
      data: { label: 'Content managment' },
      position: { x: -150, y: 300 },
    },
    {
      id: 'fe-3',
      type: 'output',
      data: { label: 'Payments' },
      position: { x: 250, y: 300 },
    },


    // node's connections
    { id: 'e-main-fe', source: 'main', target: 'fe', label: 'Frontend layer' },
    { id: 'e-main-be', source: 'main', target: 'be', label: 'Backend layer' },
    { id: 'e-main-cl', source: 'main', target: 'cl', label: 'Cloud layer'},
    // node's backend connections
    { id: 'be-be-1', source: 'be', target: 'be-1'},
    //node's cloud connections
    { id: 'cl-cl-1', source: 'cl', target: 'cl-1'},
    //node's frontend connections
    { id: 'e-fe-re', source: 'fe', target: 're'},
    { id: 're-fe-1', source: 're', target: 'fe-1'},
    { id: 're-fe-2', source: 're', target: 'fe-2'},
    { id: 're-fe-3', source: 're', target: 'fe-3'},
  ];
  
  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
  };

  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const enableFeature = (evt) => {
    console.log(evt);
    // setNodeHidden(!evt.target.checked);
    setElements((els) =>
      els.map((el) => {
        if (el.id === evt.target.id || el.id === `re-${evt.target.id}`) {
          el.isHidden = !evt.target.checked;
        }

        return el;
      })
    );
  }

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <div style={{ height: '10vh', padding: '2rem'}}>
        <form style={{display:'flex', gap:'30px'}}>
          <label>
          <input type="checkbox" 
          id="fe-1"
          defaultChecked={true}
          onChange={(evt) => enableFeature(evt)}
          /> User auth
          </label>

          <label>
          <input type="checkbox" 
          id="fe-3"
          parent-id="re"
          defaultChecked={true}
          onChange={(evt) => enableFeature(evt)}
          /> Payments
          </label>

          <label>
          <input type="checkbox" 
          id="fe-2"
          parent-id="re"
          defaultChecked={true}
          onChange={(evt) => enableFeature(evt)}
          /> Content managment
          </label>
        </form>
      </div> 
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onLoad={onLoad}
      snapToGrid={true}
      snapGrid={[15, 15]}
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'output') return '#ff0072';
          if (n.type === 'default') return '#1a192b';

          return '#eee';
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return '#fff';
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  </div>
  );
}

export default Diagram;
