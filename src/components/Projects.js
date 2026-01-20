import FlowingMenu from '../assets/modules/FlowingMenu'
export default function Projects () {
const Items = [
  { link: 'https://fiqyytodolist.netlify.app/', text: 'To Do List App', image: '' },
  { link: '#', text: 'Calculator App', image: '' },

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
