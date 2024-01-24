import { MarkerType } from "reactflow";
export const initialNodes = [
  { id: '1', type:'input', style: {
    border: "1px solid",
    borderColor:"blue",
    fontSize:"15px",
    width: 180
  },position: { x: 735, y: 100 }, data: { label: 'Add to cart' } },
  { id: '2', position: { x: 750, y: 200 }, data: { label: 'Checkout Info' } },
  { id: '3', position: { x: 750, y: 300 }, data: { label: 'Add Payment Info' }},
  { id: '4', position: { x: 750, y: 400 }, data: { label: 'Valid Payment' }, style: {
  background: "#D6D5E6",
  color: "#333",},},
  { id: '5', position: { x: 550, y: 500 }, data: { label: 'Send Order to Warehouse' }},
  { id: '6', position: { x: 950, y: 500 }, data: { label: 'Present Error Message' }},
  { id: '7', position: { x: 550, y: 600 }, data: { label: 'Pack Order' }},
  { id: '8', position: { x: 550, y: 700 }, data: { label: 'Quality Check' }, style: {
    background: "#D6D5E6",
    color: "#333",},},
  { id: '9', type:'output', style: {
    border: "2px solid",
    borderColor:"#FFC0CB",
    fontSize:"15px",
    width: 180,
  },position: { x: 750, y: 800 }, data: { label: 'Ship items to Customer' }},
];
export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', markerEnd:{type: MarkerType.ArrowClosed}},
  { id: 'e1-3', source: '2', target: '3', markerEnd: {type: MarkerType.ArrowClosed}},
  { id: 'e1-4', source: '3', target: '4', markerEnd: {type: MarkerType.ArrowClosed}},
  { id: 'e1-5', source: '4', target: '5', label: "Yes",type:'smoothstep', animated: true, markerEnd: {type: MarkerType.ArrowClosed}},
  { id: 'e1-6', source: '4', target: '6', label: "No",type:'smoothstep', animated: true, markerEnd: {type: MarkerType.ArrowClosed}},
  { id: 'e1-8', source: '5', target: '7', markerEnd: {type: MarkerType.ArrowClosed}},
  { id: 'e1-9', source: '7', target: '8', markerEnd: {type: MarkerType.ArrowClosed}},
  { id: 'e1-10', source: '8', target: '9',type:'smoothstep', markerEnd: {type: MarkerType.ArrowClosed}}
];