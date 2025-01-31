// Importing React and required libraries
import React from 'react';
import '../css/Dashboard.css'; // Add a corresponding CSS file
import dashimg from "../assets/dashbordimages/da.png"
import analyticimg from "../assets/dashbordimages/anaytic.png"
import settingimg from "../assets/dashbordimages/setting.png"
import linkimg from "../assets/dashbordimages/link.png"

const Dashboard = () => {



const today=new Date()
const option={weekday:"short",month:"short",year:"numeric",day:"numeric"}
const formateddate=today.toLocaleDateString("en-US",option);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">cuvette</h2>
        <nav className="menu">
          <a href="#" className="menu-item "> <img src={dashimg} alt=""/>Dashboard</a>
          <a href="#" className="menu-item"><img src={linkimg} alt=""/>Links</a>
          <a href="#" className="menu-item"><img src={analyticimg} alt=""/>Analytics</a>
          <a href="#" className="menu-item"><img src={settingimg} alt=""/>Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h4>Good morning, Sujith</h4>
            <p style={{color:"#878BA9"}}>{formateddate}</p>
          </div>
          <div className="header-actions">
            <button className="btn-create">+ Create new</button>
            <input
              type="text"
              placeholder="Search by remarks"
              className="search-box"
            />
            <div className="user-icon">SU</div>
          </div>
        </header>
        <section className="analytics">
          {/* {false && <div> */}
            <h3>Total Clicks <span className="clicks">1234</span></h3>
          <div className="analytics-charts">
            <div className="chart">
              <h4>Date-wise Clicks</h4>
              <ul className="bar-chart">
                <li><span className="bar" style={{ width: '80%' }}></span> 1234</li>
                <li><span className="bar" style={{ width: '70%' }}></span> 1140</li>
                <li><span className="bar" style={{ width: '10%' }}></span> 134</li>
                <li><span className="bar" style={{ width: '2%' }}></span> 34</li>
              </ul>
            </div>
            <div className="chart">
              <h4>Click Devices</h4>
              <ul className="bar-chart">
                <li><span className="bar" style={{ width: '40%' }}></span> Mobile: 134</li>
                <li><span className="bar" style={{ width: '12%' }}></span> Desktop: 40</li>
                <li><span className="bar" style={{ width: '1%' }}></span> Tablet: 3</li>
              </ul>
            </div>
          </div>
            {/* </div>}
            {
              false && <div>saeed</div>
            }
             {
              true && <div>saeedsanadi</div>
            } */}
          
        </section>
        
      </main>
    </div>
  );
};

export default Dashboard;
