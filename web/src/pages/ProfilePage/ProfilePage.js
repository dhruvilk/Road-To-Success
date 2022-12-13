import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />


      <header>
        <div className="navigation">
          <nav>
            <ul>
              <li>
              </li>

            </ul>
          </nav>
        </div>
      </header>

      <div className="horizontal-bar"></div>

      <div className="navbar-top">
        <div className="title">
          <h1 className="profileHeader" >Profile</h1>
        </div>
      </div>

      <div className="sidenav">
        <div className="profile">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
        </svg>

          <div className="name">User</div>
          <div className="status">Status :  active</div>
        </div>

        <div className="sidenav-url">
          <div className="url">
            <a href="#profile" className="active">
              Profile
            </a>
            <hr align="center"></hr>
          </div>
        </div>
      </div>

      <div className="main2">
        <h2>IDENTITY</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
            <table>
              <tbody>
                <tr>
                  <td> First Name</td>
                  <td>:</td>
                  <td>Sam</td>
                </tr>

                <tr>
                  <td> Last Name</td>
                  <td>:</td>
                  <td>Bankman</td>
                </tr>
                <tr>
                  <td>Current Password</td>
                  <td>:</td>
                  <td>
                    <input className='textpass' type="text" id="currentpassword" name="password" placeholder="Current Password" ></input>
                  </td>
                </tr>
                <tr>
                  <td>New Passowrd</td>
                  <td>:</td>
                  <td><input className='textpass' type="text" id="newpassword" name="password" placeholder="New Password" ></input></td>
                </tr>
                <tr>
                  <td>Confirm Password</td>
                  <td>:</td>
                  <td><input className='textpass' type="text" id="ConfirmPassword" name="password" placeholder="Confirm Password" ></input></td>
                </tr>
                <tr>
                  <button className='saveBtn'> Save</button>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <h2>SOCIAL MEDIA</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
            <div className="social-media">
              <span className="fa-stack fa-sm">
                <img src='web/src/pages/ProfilePage/img/twitter.jpeg'></img>
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fab fa-invision fa-stack-1x fa-inverse"></i>
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fab fa-github fa-stack-1x fa-inverse"></i>
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
              </span>
              <span className="fa-stack fa-sm">
                <i className="fas fa-circle fa-stack-2x"></i>
                <i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
