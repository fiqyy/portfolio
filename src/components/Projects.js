import FlowingMenu from '../assets/modules/FlowingMenu'
export default function Projects () {
const Items = [
  { link: 'https://to-do-list-app-uy9e.vercel.app/', text: 'To Do List App', image: '' },
  { link: 'https://calculator-app-dun-rho.vercel.app/', text: 'Calculator App', image: '' },

];
return (
<div style={{ height: '300px', position: 'relative' }}>
  <FlowingMenu items={Items}
  speed={15}
  textColor="#ffffff"
  bgColor="transparent"
  marqueeBgColor="rgb(2,99,99)"
  marqueeTextColor="white"
  borderColor="#ffffff"
/>
</div>
)
}
