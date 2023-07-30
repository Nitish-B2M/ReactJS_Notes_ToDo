import './App.scss';
import React from 'react';
import NavbarComponent from './Components/Navbars/Navbar';
import SidebarComponent from './Components/Sidebars/Sidebar';
import MainComponent from './Components/Main/Main';

function App() {

  const [mainBody, setMainBody] = React.useState('notes');

  // console.log(mainBody);

  return (
    <div className="App">
      <NavbarComponent />
      <SidebarComponent setBody={setMainBody}/>
      <MainComponent mainBody={mainBody}/>
    </div>
  );
}

export default App;
